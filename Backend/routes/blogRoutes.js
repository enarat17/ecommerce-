const express = require("express");
const blogController = require("./../controllers/blogControllers");
const authController = require("./../controllers/authControllers");
const uploadMiddleware = require("./../controllers/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    blogController.createBlog
  );

router
  .route("/:id")
  .get(blogController.getOneBlog)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    blogController.updateBlog
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    blogController.deleteBlog
  );

module.exports = router;
