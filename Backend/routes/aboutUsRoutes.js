const express = require("express");
const aboutUsPageControllers = require("./../controllers/aboutUspageContentControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    aboutUsPageControllers.createAboutUsPage
  )
  .get(aboutUsPageControllers.getAboutUsPage);

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    aboutUsPageControllers.updateAboutUsPage
  );

module.exports = router;
