const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getHomePage);

router.get('/products', productsController.getProductsPage);

router.get('/cart', productsController.getCartPage);

router.get('/orders', productsController.getOrdersPage);

module.exports = router;