const express = require("express");

const router = express.Router();
const { verifyisadmin, verifycookies } = require("../middlewares/verifycookie");

const orderscontroller = require("../controllers/orderscontroller");

router.use(verifycookies);
//get all user orders all order for one user
router.get("/", orderscontroller.getorders);
//get details for one order for one user
router.get("/user/:id", orderscontroller.getorderdetails);
router.post("/makeorder", orderscontroller.makeorder);
router.put("/paid/:id", orderscontroller.updatepaid);
router.use(verifyisadmin);
router.put("/delevierd/:id", orderscontroller.updatedelevierd);
router.get("/admin_orders", orderscontroller.getadminorders);
router.get("/analysis/:date", orderscontroller.analysis);
router.delete("/deleteorder/:id", orderscontroller.deleteorder);
module.exports = router;
