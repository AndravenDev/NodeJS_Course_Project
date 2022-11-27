const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getHomePage);

router.get('/product-list', productsController.getProductsPage);

router.get('/cart', productsController.getCartPage);

router.post('/remove-from-cart/:id', productsController.removeItemFromCart);

router.post('/add-to-cart', productsController.saveToCart)

router.get('/details/:id', productsController.getDetailsPage);

router.get('/orders', productsController.getOrdersPage);

module.exports = router;