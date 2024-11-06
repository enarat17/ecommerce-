const catchAsync = require("../utils/catchAsync");
const Review = require("./../models/reviewModel");
const User = require("./../models/userModel");
const factory = require("./FactoryHandlers");

exports.setItemUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = catchAsync(async (req, res) => {
  const { productId, rating, review } = req.body;

  // Step 2: Find the user by ID and check if they have purchased the product
  const user = await User.findById(req.user._id).populate("purchases.product");

  // Step 3: Check if the user has purchased the product
  const hasPurchased = user.purchases.some(
    purchase => purchase.product._id.toString() === productId
  );

  if (!hasPurchased) {
    return res.status(403).json({
      status: "fail",
      message: "You can only review products you have purchased."
    });
  }

  // Step 4: Create the review if the product has been purchased
  const newReview = await Review.create({
    review,
    rating,
    product: productId,
    user: req.user._id
  });

  res.status(201).json({
    status: "success",
    data: {
      review: newReview
    }
  });
});

exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
