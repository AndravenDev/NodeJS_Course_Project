const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./utils/paths");
const sequelize = require("./utils/database");

const app = express();

app.use(express.static(path.join(rootDir, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Nicy" });
});

sequelize.sync().then(res => {
  app.listen(3000);
});
