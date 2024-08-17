const express = require("express");

// const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getAllProducts,
  createProduct,
  getProduct,
} = require("../controllers/productControllers");

const router = express.Router();

router.route("/all").get(getAllProducts);
router.route("/createProduct").post(createProduct);
router.route("/single/:id").get(getProduct);

module.exports = router;
