const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const rootDir = require("./utils/paths");
const User = require("./models/user");
const user = require("./models/user");

const app = express();

app.use(express.static(path.join(rootDir, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findById("638f0bc1e39c8482408900ae")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(bodyParser.urlencoded());
app.use(adminRoutes.routes);
app.use(shopRoutes);
app.use(cartRoutes);
app.use(authRoutes);

mongoose
  .connect(
    "mongodb+srv://jax:loler123@atlascluster.3paxgym.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    user.findOne().then((user) => {
      if(!user){
        const user = new User({
          name: "Jaxi",
          email: "jaximus@jungle.gg",
          cart: { items: [] },
        });
        user.save();
      }
    })


    app.listen(3000);
  })
  .catch((err) => console.log(err));
