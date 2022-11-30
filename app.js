const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const cartRoutes = require("./routes/cart");
const rootDir = require("./utils/paths");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.use(express.static(path.join(rootDir, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findByPk(1).then(user => {
    req.user = user;
    next();
  }).catch(err => console.log(err));
})

app.use(bodyParser.urlencoded());
app.use(adminRoutes.routes);
app.use(shopRoutes);
app.use(cartRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Nicy" });
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart , {through: CartItem}); 

sequelize.sync({force: true}).then(res => {
  return User.findByPk(1);
}).then(user => {
  if(!user){
    return User.create({name: "Jax", email: "testing@attention.please"});
  }
  return Promise.resolve(user);
}).then(user => {
  app.listen(3000);
});
