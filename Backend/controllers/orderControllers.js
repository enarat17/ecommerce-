const Coupon = require("../models/couponModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validateCoupon = catchAsync(async (req, res, next) => {
  const { couponCode } = req.body;
  const userId = req.user.id;

  if (!couponCode) {
    // No coupon provided, proceed to checkout without applying coupon
    req.coupon = null;
    return next();
  }

  // Find the coupon by code
  const coupon = await Coupon.findOne({ code: couponCode });

  if (!coupon) {
    return next(new AppError("Invalid coupon code.", 404));
  }

  const now = new Date();
  // Validate if coupon is active
  if (now < coupon.validFrom || now > coupon.validUntil) {
    return next(new AppError("Coupon is not valid at this time.", 400));
  }

  if (coupon.usageCount >= coupon.maxUsage) {
    return res.status(400).json({ error: "Coupon usage limit reached" });
  }

  if (coupon.usersUsed.includes(userId)) {
    return res.status(400).json({ error: "Coupon already used by this user" });
  }

  // Update coupon usage
  coupon.usageCount += 1;
  coupon.usersUsed.push(userId);
  await coupon.save();

  // Coupon is valid, pass it to the next middleware
  req.coupon = coupon; // Attach coupon object to the request
  next();
});

async function calculateTotalCartValue(user, coupon) {
  // Calculate the total value of the cart
  let totalCartValue = user.cart.reduce((total, cartItem) => {
    const { price } = cartItem.product;
    return total + price;
  }, 0);

  // Apply coupon discount if available
  let discountApplied = 0;
  if (coupon) {
    discountApplied = (coupon.discountPercentage / 100) * totalCartValue;
    totalCartValue -= discountApplied;
  }

  return { totalCartValue, discountApplied };
}

exports.applyCoupon = catchAsync(async (req, res) => {
  const { couponCode } = req.body;
  const userId = req.user.id;

  if (!userId || !couponCode) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // Fetch user and their cart items
  const user = await User.findById(userId).populate("cart.product");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const cartItems = user.cart;

  if (cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  // Calculate total price of items in the cart
  const totalCartPrice = cartItems.reduce((total, item) => {
    const { product } = item;

    // Add product price to the total
    return total + product.price; // Directly using `product.price`
  }, 0);

  // Validate the coupon
  const coupon = await Coupon.findOne({ code: couponCode });
  if (!coupon) {
    return res.status(404).json({ error: "Coupon not found" });
  }

  if (new Date() < coupon.validFrom || new Date() > coupon.validUntil) {
    return res.status(400).json({ error: "Coupon has expired" });
  }

  if (coupon.usageCount >= coupon.maxUsage) {
    return res.status(400).json({ error: "Coupon usage limit reached" });
  }

  // Apply the discount
  const discount = (totalCartPrice * coupon.discountPercentage) / 100;
  const newTotalPrice = totalCartPrice - discount;

  res.json({ discount, newTotalPrice });
});

exports.calculateCartTotal = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "cart.product",
    select: "price"
  });

  if (!user || user.cart.length === 0) {
    return next(new AppError("Cart is empty.", 400));
  }

  const { totalCartValue, discountApplied } = await calculateTotalCartValue(
    user,
    req.coupon
  );

  // Attach total cart value, discount, and cart data to the request
  req.totalCartValue = totalCartValue;
  req.discountApplied = discountApplied;
  req.cartItems = user.cart;

  next();
});

exports.sendCartTotal = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      totalCartValue: req.totalCartValue,
      discountApplied: req.discountApplied,
      finalCartValue: req.totalCartValue - req.discountApplied
    }
  });
};

async function createOrder(user, totalCartValue, discountApplied, coupon) {
  const cartItems = user.cart.map(item => {
    const { product } = item;

    /// Directly access the price and document from the product
    const { price } = product;
    const { file } = product;

    // Ensure the file and price are provided
    if (!file || !price) {
      throw new AppError("Missing required product details", 400);
    }

    return {
      product: product._id,
      price,
      file
    };
  });

  const newOrder = new Order({
    user: user._id,
    products: cartItems,
    totalPrice: totalCartValue,
    coupon: coupon._id,
    discountApplied
  });

  await newOrder.save();
  return newOrder;
}

exports.checkout = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("cart.product");

  if (!user || user.cart.length === 0) {
    return next(new AppError("Cart is empty.", 400));
  }

  const newOrder = await createOrder(
    user,
    req.totalCartValue,
    req.discountApplied,
    req.coupon
  );

  // Update the user with the purchased products
  user.purchases = user.purchases.concat(newOrder.products);
  await user.save({ validateBeforeSave: false });

  // Clear the user's cart after purchase
  user.cart = [];
  await user.save({ validateBeforeSave: false });

  // If a coupon was used, increment the coupon's usage count
  if (req.coupon) {
    await Coupon.findByIdAndUpdate(req.coupon.id, { $inc: { usageCount: 1 } });
  }

  res.status(200).json({
    message: "Order placed successfully!",
    order: newOrder
  });
});
