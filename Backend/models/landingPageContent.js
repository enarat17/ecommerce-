const mongoose = require("mongoose");

const landingPageSchema = new mongoose.Schema({
  intro_AR: {
    type: String,
    required: [true, "Intro sentence in Arabic is required"],
    trim: true
  },
  intro_EN: {
    type: String,
    required: [true, "Intro sentence in English is required"],
    trim: true
  },
  image: {
    type: String,
    required: true
  }
});

const LandingPage = mongoose.model("LandingPage", landingPageSchema);

module.exports = LandingPage;
