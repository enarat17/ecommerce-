const express = require("express");
const termsAndConditionsPageControllers = require("./../controllers/termsAndConditionsPageControllers");
const authController = require("./../controllers/authControllers");
const uploadMiddleware = require("../controllers/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    termsAndConditionsPageControllers.createTermsAndConditionsPage
  )
  .get(termsAndConditionsPageControllers.getTermsAndConditionsPage);

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    termsAndConditionsPageControllers.updateTermsAndConditionsPage
  );

module.exports = router;
