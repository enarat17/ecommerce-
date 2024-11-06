const mongoose = require("mongoose");
const review = require("./ReviewModel");

const imagesschema = mongoose.Schema({
  path: { type: String, required: true },
});
const productschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
    Number_rating: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      required: true,
    },
    attrs: [{ key: { type: String }, value: [{ type: String }] }],
    images: [imagesschema],
    sales: {
      type: Number,
      default: 0,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: review }],
  },
  {
    timestamps: true,
  }
);

productschema.pre(/^find/, function (next) {
  this.populate("reviews");
  next();
});
productschema.index(
  { name: "text", description: "text" },
  { name: "TextIndex" }
);

productschema.index({ "attrs.key": 1, "attrs.value": 1 });

const Product = mongoose.model("Product", productschema);

module.exports = Product;
