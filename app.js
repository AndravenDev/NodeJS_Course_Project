const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const cartRoutes = require("./routes/cart");
const rootDir = require("./utils/paths");
// const sequelize = require("./utils/database");
// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-items");

const mongoConnect = require('./utils/database').mongoConnect;

const app = express();

app.use(express.static(path.join(rootDir, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(adminRoutes.routes);
app.use(shopRoutes);
// app.use(cartRoutes);

// app.use((req, res, next) => {
//   res.status(404).render("404", { pageTitle: "Nicy" });
// });
mongoConnect(client => {
  app.listen(3000);
})









// app.use((req, res, next) => {
//   User.findByPk(1).then(user => {
//     req.user = user;
//     next();
//   }).catch(err => console.log(err));
// })


// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);

// User.hasOne(Cart);
// Cart.belongsTo(User);

// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart , {through: CartItem});

// Order.hasOne(User);
// User.hasMany(Order);

// Order.belongsToMany(Product, { through: OrderItem})

// sequelize.sync().then(res => {
//   return User.findByPk(1);
// })
// .then(user => {
//   if(!user){
//     return User.create({name: "Jax", email: "testing@attention.please"});
//   }
//   return user;
// })
// .then((user) => {
//   return user.createCart();
// })
// .then(cart => {
//   app.listen(3000);
// })
// .catch(err => console.log(err));

