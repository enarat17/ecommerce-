const express = require("express");
const consultationControllers = require("./../controllers/consultationControllers");
const authController = require("../controllers/authControllers");
const uploadMiddleware = require("./../controllers/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .get(consultationControllers.getAllConsultations)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    consultationControllers.createConsultation
  );

router
  .route("/:id")
  .get(consultationControllers.getOneConsultation)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    consultationControllers.updateConsultation
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    consultationControllers.deleteConsultation
  );

module.exports = router;
