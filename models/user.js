const getDb = require("../utils/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    db.collection("users")
      .insertOne(this)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((x) => x.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            qty: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).qty,
          };
        });
      })
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cartProd) => {
      return cartProd.productId.toString() === product._id.toString();
    });

    let newQty = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQty = this.cart.items[cartProductIndex].qty + 1;
      updatedCartItems[cartProductIndex].qty++;
    } else {
      updatedCartItems.push({ productId: product._id, qty: newQty });
    }

    const updatedCart = { items: updatedCartItems };

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  removeFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((x) => {
      console.log(x);
      return x.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: { _id: new mongodb.ObjectId(this._id) },
          name: this.name,
          email: this.email,
        };

        return db.collection("orders").insertOne(order);
      })
      .then(() => {
        this.cart = {};
        return db
          .collection("users")
          .updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();
    return db.collection("orders").find({
      "user._id": new mongodb.ObjectId(this._id),
    }).toArray();
  }
}

module.exports = User;

// const Sequelize = require("sequelize");

// const sequelize = require("../utils/database");

// const User = sequelize.define("user", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
// });

// module.exports = User;
