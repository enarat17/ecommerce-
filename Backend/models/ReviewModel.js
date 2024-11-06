const mongoose = require("mongoose");

const reviewschema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    rating: { type: Number },
    user: {
      _id: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const review = mongoose.model("review", reviewschema);

module.exports = review;
