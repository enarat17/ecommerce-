const express = require("express");
const productscontrol = require("../controllers/productscontrollers");
const { verifycookies, verifyisadmin } = require("../middlewares/verifycookie");

const router = express.Router();

router.get("/category/:categoryname", productscontrol.getproducts);
router.get(
  "/category/:categoryname/search/:searchkey",
  productscontrol.getproducts
);
router.get("/search/:searchkey", productscontrol.getproducts);

router.get("/", productscontrol.getproducts);
router.get("/bestseller", productscontrol.getbestseller);
router.get("/get_one/:productid", productscontrol.getproductbyid);

//admin routers

router.use(verifycookies);
router.use(verifyisadmin);
router.get("/admin", productscontrol.getadminproduct);
router.delete("/admin/:id", productscontrol.deleteadminproduct);
router.post("/admin_create_one", productscontrol.createadminproduct);
router.put("/admin_update_one/:id", productscontrol.updateadminproduct);
router.post("/admin_uplad", productscontrol.adminupload);
router.delete(
  "/admin/image/:imagepath/:productid",
  productscontrol.deleteimages
);
module.exports = router;
