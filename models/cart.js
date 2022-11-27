const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/paths');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, price) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0}
            if(!err) {
                cart = JSON.parse(fileContent)
            }

            const existingProductIndex = cart.products.findIndex(x => x.id === id);
            const productIsAlreadyInCart = cart.products[existingProductIndex];

            let updatedProduct;
            if(productIsAlreadyInCart){
                updatedProduct = {...productIsAlreadyInCart}
                updatedProduct.qty++;
                cart.products == [...cart.products]
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1}
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice += +price;

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log('wtf ', err);
            });
        });
    }

    static deleteProduct(id, price) {
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };

            const product = updatedCart.products.find(prod => prod.id === id);
            const prodQty = product.qty;
            updatedCart.products = updatedCart.products.filter(x => x.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice = prodQty * product.price;

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log('wtf ', err);
            });
        })
    }

    static getCartProducts(cb) {
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                console.log(err);
                return;
            }
            cb(JSON.parse(fileContent));
        });
    }
}