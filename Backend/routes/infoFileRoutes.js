const express = require("express");
const infoFileControllers = require("../controllers/infoFileControllers");
const authController = require("../controllers/authControllers");
const uploadMiddleware = require("../controllers/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    infoFileControllers.uploadFile
  );

router
  .route("/:id")
  .get(infoFileControllers.getFile)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    infoFileControllers.updateFile
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    infoFileControllers.deleteFile
  );

module.exports = router;
