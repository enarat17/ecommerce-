const catchAsync = require("../utils/catchAsync");
const Consultation = require("../models/consultationModel");
const User = require("../models/userModel");
const Blog = require("../models/blogPostModel");
const Product = require("../models/productModel");
const Review = require("../models/reviewModel");

// gets the total number of all models available
exports.websiteAnalysis = catchAsync(async (req, res) => {
  const usersCount = await User.countDocuments();
  const blogsCount = await Blog.countDocuments();
  const reviewsCount = await Review.countDocuments();
  const productsCount = await Product.countDocuments();
  const consultsCount = await Consultation.countDocuments();

  res.status(200).json({
    status: "success",
    data: {
      consultsCount,
      usersCount,
      blogsCount,
      productsCount,
      reviewsCount
    }
  });
});

// landing page content
exports.landingPageContent = catchAsync(async (req, res) => {
  //latest 6 bestselling products
  let bestSellingProducts = await Product.find()
    .sort({ Sucessful_Purchases: -1 })
    .limit(6)
    .select(
      "-body_AR -body_EN -basic_version -open_version -editable_version -__v -category -images -slug -video"
    );
  if (bestSellingProducts.length === 0) {
    bestSellingProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .select(
        "-body_AR -body_EN -basic_version -open_version -editable_version -__v -category -images -slug -video"
      );
  }

  //4 consults
  const consults = await Consultation.find()
    .sort({ createdAt: -1 })
    .limit(4)
    .select("-body_AR -body_EN -category -__v -images -slug");

  // Return all data as a single JSON response
  res.status(200).json({
    bestSellingProducts,
    consults
  });
});
