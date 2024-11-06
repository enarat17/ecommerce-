const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      version: {
        type: String,
        required: [true, "Version is required"]
      },
      price: {
        type: Number,
        required: [true, "Price is required"]
      },
      document: {
        type: String,
        required: [true, "Document is required"]
      }
    }
  ],
  totalPrice: { type: Number, required: true },
  coupon: {
    type: mongoose.Schema.ObjectId,
    ref: "Coupon",
    required: false
  },
  discountApplied: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
