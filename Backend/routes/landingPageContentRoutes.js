const express = require("express");
const landingPageContentControllers = require("./../controllers/landingPageContentControllers");
const authController = require("./../controllers/authControllers");
const uploadMiddleware = require("../controllers/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    landingPageContentControllers.createLandingPage
  )
  .get(landingPageContentControllers.getLandingPage);

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    landingPageContentControllers.updateLandingPage
  );

module.exports = router;
