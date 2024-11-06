const mongoose = require("mongoose");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Add a product version to the cart
exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  // Check if the product exists and get only necessary fields
  const product = await Product.findById(productId).select(
    "title_AR title_EN price"
  );
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // Check if the product is already in the cart
  const user = await User.findById(req.user.id);
  const cartItemExists = user.cart.some(
    item => item.product.toString() === productId
  );

  if (cartItemExists) {
    return next(new AppError("Product is already in the cart", 400));
  }

  // Add to cart
  user.cart.push({ product: productId });
  await user.save({ validateBeforeSave: false });

  // Prepare the response data for all cart items
  const cartItems = await Promise.all(
    user.cart.map(async item => {
      const cartProduct = await Product.findById(item.product).select(
        "title_AR title_EN price "
      );
      return {
        product: {
          _id: cartProduct._id,
          title_AR: cartProduct.title_AR,
          title_EN: cartProduct.title_EN,
          price: cartProduct[item.file].price
        }
      };
    })
  );

  res.status(200).json({
    status: "success",
    data: {
      cartItems
    }
  });
});

// Remove an item from the cart
exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  // Ensure productId is a valid ObjectId
  // if (!mongoose.Types.ObjectId.isValid(productId)) {
  //   return next(new AppError("Invalid product ID", 400));
  // }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { cart: { product: productId } } },
    { new: true }
  ).populate("cart.product", "title_AR title_EN price");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const cartResponse = user.cart.map(item => ({
    product: {
      _id: item.product._id,
      title_AR: item.product.title_AR,
      title_EN: item.product.title_EN,
      price: item.product.price
    }
  }));

  res.status(200).json({
    status: "success",
    data: { cart: cartResponse }
  });
});

// Get the user's cart
exports.getCart = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("cart");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.cart.length === 0) {
    return res.status(200).json({
      data: {
        cart: []
      }
    });
  }

  const cartItems = await Promise.all(
    user.cart.map(async item => {
      const product = await Product.findById(item.product).select(
        "title_AR title_EN coverImage price"
      );
      return {
        product: {
          _id: product._id,
          title_AR: product.title_AR,
          title_EN: product.title_EN,
          coverImage: product.coverImage,
          price: product.price
        }
      };
    })
  );

  res.status(200).json({
    status: "success",
    data: {
      cart: cartItems
    }
  });
});
