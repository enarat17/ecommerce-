const express = require("express");
const privacyPolicyPageControllers = require("./../controllers/privacyPolicyPageControllers");
const authController = require("./../controllers/authControllers");
const uploadMiddleware = require("../controllers/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    privacyPolicyPageControllers.createPrivacyPolicyPage
  )
  .get(privacyPolicyPageControllers.getPrivacyPolicyPage);

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    privacyPolicyPageControllers.updatePrivacyPolicyPage
  );

module.exports = router;
