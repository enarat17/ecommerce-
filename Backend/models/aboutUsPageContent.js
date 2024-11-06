const mongoose = require("mongoose");

const propertiesSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: [true, "Property icon is required"]
  },
  title_AR: {
    type: String,
    required: [true, "Property title in Arabic is required"],
    trim: true
  },
  title_EN: {
    type: String,
    required: [true, "Property title in English is required"],
    trim: true
  },
  description_AR: {
    type: String,
    required: [true, "Property description in Arabic is required"],
    trim: true
  },
  description_EN: {
    type: String,
    required: [true, "Property description in English is required"],
    trim: true
  }
});

const aboutUsPageSchema = new mongoose.Schema({
  aboutUs_AR: {
    type: String,
    required: [true, "aboutUs sentence is required"],
    trim: true
  },
  aboutUs_EN: {
    type: String,
    required: [true, "aboutUs sentence is required"],
    trim: true
  },
  ourVision_AR: {
    type: String,
    required: [true, "ourVision description is required"],
    trim: true
  },
  ourVision_EN: {
    type: String,
    required: [true, "ourVision description is required"],
    trim: true
  },
  message_AR: {
    type: String,
    required: [true, "message description is required"],
    trim: true
  },
  message_EN: {
    type: String,
    required: [true, "message description is required"],
    trim: true
  },
  goals_AR: {
    type: String,
    required: [true, "goals description is required"],
    trim: true
  },
  goals_EN: {
    type: String,
    required: [true, "goals description is required"],
    trim: true
  },
  properties: [propertiesSchema]
});

const AboutUsPage = mongoose.model("AboutUsPage", aboutUsPageSchema);

module.exports = AboutUsPage;
