const express = require("express");
const categorycontroller = require("../controllers/categorycontroller");
const router = express.Router();

router.get("/", categorycontroller.getcategory);
router.post("/", categorycontroller.postcategory);
router.delete("/:category", categorycontroller.deletecategory);
router.post("/attr", categorycontroller.postattrs);

module.exports = router;
