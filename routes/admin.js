const express = require("express");

const productsController = require('../controllers/products');

const router = express.Router();

router.get("/add-product", productsController.getAddProductPage);

router.get("/admin-products", productsController.getAdminProductPage);

router.post("/add-product", productsController.saveProducts);

router.get("/edit-product", productsController.saveProducts);

exports.routes = router;
