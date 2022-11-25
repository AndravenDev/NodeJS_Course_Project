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
}