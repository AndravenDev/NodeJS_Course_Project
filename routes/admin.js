const express = require("express");

const productsController = require('../controllers/products');

const router = express.Router();

router.get("/add-product", productsController.getAddProductPage);

router.get("/admin-products", productsController.getAdminProductPage);

router.post("/add-product", productsController.saveProducts);

router.post("/edit-product", productsController.saveUpdatedProduct);

router.get("/edit-product/:id", productsController.getEditProductPage);

exports.routes = router;
