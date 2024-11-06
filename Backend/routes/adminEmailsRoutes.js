const express = require("express");
const multer = require("multer");
const authController = require("../controllers/authControllers");
const adminEmailsController = require("../controllers/adminEmailsControllers");

const router = express.Router();

const upload = multer();

router.post(
  "/contact-us",
  upload.single("file"),
  adminEmailsController.inquiryEmail
);

router
  .route("/")
  .get(adminEmailsController.getAdminEmails)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    adminEmailsController.createAdminEmail
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    adminEmailsController.deleteAdminEmail
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    adminEmailsController.updateAdminEmail
  );

module.exports = router;
