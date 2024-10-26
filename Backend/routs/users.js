const express = require("express");
const userscontroller = require("../controllers/userscontroller");
const { verifycookies, verifyisadmin } = require("../middlewares/verifycookie");
const router = express.Router();

router.get("/", userscontroller.getusers);
router.post("/register", userscontroller.registeruser);
router.post("/login", userscontroller.loginuser);

router.use(verifycookies);
router.put("/profile", userscontroller.updateprofile);
router.get("/profile_data/:id", userscontroller.getprofiledata);
router.post("/review/:product_id", userscontroller.makereview);

router.get("/:id", userscontroller.getuser);
router.use(verifyisadmin);
router.put("/:id", userscontroller.updateuser);
router.delete("/:id", userscontroller.deleteuser);

module.exports = router;
