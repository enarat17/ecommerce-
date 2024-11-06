const factory = require("./FactoryHandlers");
const Coupon = require("../models/couponModel");

exports.createCoupon = factory.createOne(Coupon);
exports.showCoupons = factory.getAll(Coupon);
exports.updateCoupon = factory.updateOne(Coupon);
exports.deleteCoupon = factory.deleteOne(Coupon);
