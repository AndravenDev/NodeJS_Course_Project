const express = require('express');

const shopController = require('../controllers/products');

const router = express.Router();

router.get('/', shopController.getHomePage);

router.get('/product-list', shopController.getProductsPage);

router.get('/details/:id', shopController.getDetailsPage);

router.get('/orders', shopController.getOrdersPage);

module.exports = router;