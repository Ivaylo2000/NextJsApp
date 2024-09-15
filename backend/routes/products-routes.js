const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");
const auth = require("../middleware/auth");
const validateProduct = require("../middleware/validateProduct");
const {
  getProducts,
  getProduct,
  addProduct,
  getUserProducts,
} = require("../controllers/products-controller");

router.get("/", getProducts);
router.get("/:productName", getProduct);
router.get("/user/:username", getUserProducts);

router.use(auth);

router.post(
  "/addProduct",
  fileUpload.single("image"),
  validateProduct,
  addProduct
);
module.exports = router;
