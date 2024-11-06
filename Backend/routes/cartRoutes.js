const express = require("express");
const authController = require("../controllers/authControllers");
const cartController = require("../controllers/cartControllers");
const orderController = require("../controllers/orderControllers");

const router = express.Router();

router.use(authController.protect);
router.get(
  "/calculate",
  orderController.calculateCartTotal,
  orderController.sendCartTotal
);

router
  .route("/")
  .post(cartController.addToCart)
  .get(cartController.getCart)
  .delete(cartController.removeFromCart);

module.exports = router;
