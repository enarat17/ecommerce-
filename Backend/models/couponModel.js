const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  maxUsage: { type: Number, default: 1 },
  usageCount: { type: Number, default: 0 },
  minOrderValue: { type: Number, default: 0 },
  usersUsed: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
