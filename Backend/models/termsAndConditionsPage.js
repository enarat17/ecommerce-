const mongoose = require("mongoose");

const TermsAndConditionsPageSchema = new mongoose.Schema({
  coverImage: {
    type: String,
    required: true
  },
  description_AR: {
    type: String,
    required: [true, "description sentence is required"],
    trim: true
  },
  description_EN: {
    type: String,
    required: [true, "description sentence is required"],
    trim: true
  }
});

const TermsAndConditionsPage = mongoose.model(
  "TermsAndConditionsPage",
  TermsAndConditionsPageSchema
);

module.exports = TermsAndConditionsPage;
