const express = require("express");
const membersControllers = require("../controllers/membersControllers");
const authControllers = require("../controllers/authControllers");
const uploadMiddleware = require("../controllers/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .get(membersControllers.getAllMembers)
  .post(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    membersControllers.createMember
  );

router
  .route("/:id")
  .get(membersControllers.getMember)
  .patch(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    membersControllers.updateMember
  )
  .delete(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    membersControllers.deleteMember
  );

module.exports = router;
