const express = require("express");
const orderControllers = require("../controllers/orderControllers");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.use(authControllers.protect, authControllers.restrictTo("user"));

router.post("/apply-coupon", orderControllers.applyCoupon);

router.post(
  "/checkout",
  orderControllers.validateCoupon,
  orderControllers.calculateCartTotal,
  orderControllers.checkout
);

module.exports = router;
