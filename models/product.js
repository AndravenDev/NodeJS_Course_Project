const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dirname = require('../utils/paths');

const p = path.join(dirname, 'data', 'product.json');

const Cart = require("./cart");

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product{
    constructor(id, title, imageUrl, price, description){
        this.id = id,
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save() {
        getProductsFromFile((data) => {
            if(this.id){
                const existingProductIndex = data.findIndex(x => x.id === this.id);
                const updatedProducts = [...data];
                updatedProducts[existingProductIndex] = this;

                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = uuidv4();
                data.push(this);
                fs.writeFile(p, JSON.stringify(data), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById (id) {
        getProductsFromFile(prods => {
            const productToDelete = prods.find(x => x.id === id);
            const updatedProductList = prods.filter(x => x.id !== id);
            console.log('ehaaa', updatedProductList);
            fs.writeFile(p, JSON.stringify(updatedProductList), (err) => {
                console.log(err);
                if(!err){
                    Cart.deleteProduct(id, productToDelete.price);
                }
            });
        });
    }

    static getAllProducts (cb) {
        getProductsFromFile(cb);
    }

    static getProductById (id ,cb) {
        getProductsFromFile(products => {
            const product = products.filter(x => x.id === id);
            cb(product[0]);
        })
    }
};