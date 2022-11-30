const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();

router.get('/cart', cartController.getCartPage);

router.post('/remove-from-cart/:id', cartController.removeItemFromCart);

router.post('/add-to-cart', cartController.saveToCart);

module.exports = router;