const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();

router.get('/cart', cartController.getCartPage);

router.post('/remove-from-cart/:id', cartController.removeFromCart);

router.post('/add-to-cart', cartController.saveToCart);

router.post('/create-order', cartController.postOrder)

module.exports = router;