const express = require("express");
const paymentControllers = require("../controllers/paymentControllers");
const authController = require("../controllers/authControllers");

const router = express.Router();

router.use(authController.protect, authController.restrictTo("user"));

router.post("/payment-intent", paymentControllers.createPaymentIntent);

module.exports = router;
