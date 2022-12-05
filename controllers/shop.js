const Product = require("../models/product");

exports.getHomePage = (req, res, next) => {
  res.render("shop/index", { pageTitle: "Home" });
};

exports.getOrdersPage = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      console.log(orders[0]);
      res.render("shop/orders", { pageTitle: "Orders", orders: orders });
    })
    .catch((err) => console.log(err));
};

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll()
    .then((data) => {
      res.render("shop/product-list", { prods: data, pageTitle: "Products" });
    })
    .catch((err) => console.log(err));
};

exports.getDetailsPage = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then((products) => {
      res.render("shop/product-details", {
        product: products,
        pageTitle: "Details",
      });
    })
    .catch((err) => console.log(err));
};
