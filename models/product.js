// const Sequelize = require("sequelize");

// const sequelize = require("../utils/database");
const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class Product {
  constructor(title, price, imageUrl, description, id, userId){
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id;
    this.userId = userId
  }

  save() {
    console.log('Thissss  ',this);
    const db = getDb();
    let dbOperation;
    if(this._id){
      dbOperation = db.collection('products').updateOne({ _id: mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOperation = db.collection('products').insertOne(this).then(data => console.log(data)).catch(err => console.log(err));
    }

    return db.collection('products').insertOne(this).then((res) => {

    }).catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray().then(products => {
      return products
    }).catch(err => console.log(err));
  }

  static findById(id) {
    const db = getDb();
    return db.collection('products').find({ _id: mongodb.ObjectId(id) }).next().then().catch(err => console.log(err));
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)}).then(result => {
      console.log('deleted ', result);
    }).catch(err => console.log(err));
  }
}

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: { type: Sequelize.STRING, allowNull: false},
//   price: { type: Sequelize.DOUBLE, allowNull: false},
//   imageUrl: { type: Sequelize.STRING, allowNull: true},
//   description: { type: Sequelize.STRING, allowNull: false }
// });

module.exports = Product;
