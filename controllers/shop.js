const Product = require("../models/product");
const Order = require("../models/order");

exports.getHomePage = (req, res, next) => {
  res.render("shop/index", { pageTitle: "Home" });
};

exports.getOrdersPage = (req, res, next) => {
  console.log(req.user);
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render("shop/orders", { pageTitle: "Orders", orders: orders });
    })
    .catch((err) => console.log(err));
};

exports.getProductsPage = (req, res, next) => {
  Product.find().populate('userId')
    .then((data) => {
      console.log(data);
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
