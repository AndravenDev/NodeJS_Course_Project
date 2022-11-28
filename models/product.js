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

const db = require('../utils/database');
module.exports = class Product{
    constructor(id, title, imageUrl, price, description){
        this.id = id,
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save() {
        return db.execute('INSERT INTO product (title, price, imageURL, description) VALUES (?, ?, ?, ?)', 
        [this.title, this.price, this.imageUrl, this.description]
        );
    }

    static deleteById (id) {

    }

    static getAllProducts () {
        return db.execute('SELECT * FROM PRODUCT');
    }

    static getProductById (id) {
        return db.execute('SELECT * FROM product WHERE product.id = ?', [id]);
    }
};