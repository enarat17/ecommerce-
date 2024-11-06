const mongoose = require("mongoose");
const user = require("../models/UserModel");

const orderschema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: user,
    },
    orderTotal: {
      itemsCount: { type: Number, required: true },
      cartSubtotal: { type: Number, required: true },
    },
    cartItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { path: { type: String, required: true } },
        quantity: { type: Number, required: true },
        count: { type: Number, required: true },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
      default: "on delevierd",
    },
    transactionResult: {
      status: { type: String },
      createTime: { type: String },
      amount: { type: Number },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("order", orderschema);

module.exports = order;
