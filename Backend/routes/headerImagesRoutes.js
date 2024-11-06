const express = require("express");
const uploadMiddleware = require("../controllers/uploadMiddleware");
const authControllers = require("../controllers/authControllers");
const headerImagesControllers = require("../controllers/headerImageControllers");

const router = express.Router();

router
  .route("/")
  .post(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    headerImagesControllers.uploadHeaderImages
  )
  .get(headerImagesControllers.getHeaderImages);

router
  .route("/:id")
  .patch(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    headerImagesControllers.updateHeaderImage
  );

module.exports = router;
