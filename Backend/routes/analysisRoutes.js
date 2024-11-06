const express = require("express");
const analysis = require("../controllers/analysis");
const authController = require("../controllers/authControllers");

const router = express.Router();

router.get(
  "/analysis",
  authController.protect,
  authController.restrictTo("admin"),
  analysis.websiteAnalysis
);

router.get("/landingPage", analysis.landingPageContent);

module.exports = router;
