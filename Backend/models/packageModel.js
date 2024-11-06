const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title_AR: {
      type: String,
      required: [true, "A package must have an arabic title"],
      trim: true
    },
    title_EN: {
      type: String,
      required: [true, "A package must have an english title"],
      trim: true
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "A package must contain at least one product"]
      }
    ],
    description_AR: {
      type: String,
      required: [true, "an package must have an arabic description"]
    },
    description_EN: {
      type: String,
      required: [true, "an package must have an english description"]
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          return value > 0;
        },
        message: "Price must be greater than zero"
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
