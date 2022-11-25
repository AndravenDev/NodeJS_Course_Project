const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dirname = require('../utils/paths');

const p = path.join(dirname, 'data', 'product.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product{
    constructor(title, imageUrl, price, description){
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save() {
        this.id = uuidv4();
        getProductsFromFile((data) => {
            data.push(this);
            fs.writeFile(p, JSON.stringify(data), (err) => {
                console.log(err);
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