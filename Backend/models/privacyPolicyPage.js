const mongoose = require("mongoose");

const PrivacyPolicyPageSchema = new mongoose.Schema({
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

const PrivacyPolicyPage = mongoose.model(
  "PrivacyPolicyPage",
  PrivacyPolicyPageSchema
);

module.exports = PrivacyPolicyPage;
