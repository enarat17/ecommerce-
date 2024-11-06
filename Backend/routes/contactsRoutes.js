const express = require("express");
const contactHandlers = require("../controllers/contactsControllers");
const authControllers = require("../controllers/authControllers");
const uploadMiddleware = require("../controllers/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .get(contactHandlers.getContactInfo)
  .post(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    contactHandlers.createContactInfo
  );

router
  .route("/:id")
  .patch(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    contactHandlers.updateContactInfo
  )
  .delete(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    contactHandlers.deleteContactInfo
  );

module.exports = router;
