const catchAsync = require("../utils/catchAsync");
const AboutUsPage = require("./../models/aboutUsPageContent");
const factory = require("./FactoryHandlers");

exports.getAboutUsPage = factory.getAll(AboutUsPage);
exports.createAboutUsPage = factory.createOne(AboutUsPage);

exports.updateAboutUsPage = catchAsync(async (req, res) => {
  const updateFields = {};
  const allowedFields = [
    "aboutUs_AR",
    "aboutUs_EN",
    "ourVision_AR",
    "ourVision_EN",
    "message_AR",
    "message_EN",
    "goals_AR",
    "goals_EN"
  ];

  // Check and add allowed fields to updateFields
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  // Handle properties update
  if (req.body.properties) {
    updateFields.properties = JSON.parse(req.body.properties);
  }

  const updatedPage = await AboutUsPage.findOneAndUpdate(
    {}, // Assuming there's only one AboutUsPage document
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedPage) {
    return res.status(404).json({ message: "AboutUsPage not found" });
  }

  res.status(200).json({
    message: "success",
    aboutUspage: updatedPage
  });
});
