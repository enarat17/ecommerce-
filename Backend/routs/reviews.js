const express = require("express");
const reviewscontroller = require("../controllers/reviewscontroller");
const router = express.Router();

router.get("/", reviewscontroller.getreviews);

module.exports = router;
