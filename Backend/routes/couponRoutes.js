const express = require("express");
const couponControllers = require("../controllers/couponControllers");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router
  .route("/")
  .get(couponControllers.showCoupons)
  .post(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    couponControllers.createCoupon
  );

router
  .route("/:id")
  .patch(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    couponControllers.updateCoupon
  )
  .delete(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    couponControllers.deleteCoupon
  );

module.exports = router;
