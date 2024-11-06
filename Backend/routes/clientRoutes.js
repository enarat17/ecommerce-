const express = require("express");
const clientController = require("./../controllers/clientControllers");
const authController = require("./../controllers/authControllers");
const uploadMiddleware = require("../controllers/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    clientController.createClient
  )
  .get(clientController.getAllClients);

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    clientController.getOneClient
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    clientController.updateClient
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    clientController.deleteClient
  );

module.exports = router;
