const express = require("express");

const adminController = require('../controllers/admin');

const router = express.Router();

router.get("/add-product", adminController.getAddProductPage);

router.get("/admin-products", adminController.getAdminProductPage);

router.post("/add-product", adminController.saveProducts);

router.post("/edit-product", adminController.saveUpdatedProduct);

router.post("/delete/:id", adminController.deleteProduct);

router.get("/edit-product/:id", adminController.getEditProductPage);

exports.routes = router;
