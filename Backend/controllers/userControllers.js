const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./FactoryHandlers");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = catchAsync(async (req, res, next) => {
  // The user is already available on req.user thanks to the protect middleware
  const { user } = req;

  // Select only the necessary fields
  const UserData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  res.status(200).json({
    status: "success",
    data: {
      user: UserData
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null
  });
});

exports.getPurchases = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "purchases.product",
    select: "title_EN title_AR basic_version open_version"
  });

  if (!user || user.purchases.length === 0) {
    return next(new AppError("User not found or you have no purchases", 404));
  }

  // Restructure purchases based on the user's selected language
  const optimizedPurchases = user.purchases.map(purchase => {
    const { product } = purchase;
    const { version } = purchase;
    const selectedVersion = product[version]; // Get either basic_version or open_version

    return {
      productName_AR: product.title_AR,
      productName_EN: product.title_EN,
      version: version,
      price: selectedVersion.price,
      file: selectedVersion.document
    };
  });

  res.status(200).json({
    status: "success",
    data: {
      purchases: optimizedPurchases
    }
  });
});

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.createUser = factory.createOne(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
