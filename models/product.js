const fs = require('fs');
const path = require('path');

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
};