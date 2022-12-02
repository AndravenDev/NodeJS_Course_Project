const Product = require("../models/product");
const mongoDb = require("mongodb");

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add some products",
    editing: false,
  });
};

exports.saveProducts = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, imageUrl, description);
  product.save()
    .then((data) => {
      res.redirect("/admin-products");
    })
    .catch((err) => console.log(err));
};

exports.saveUpdatedProduct = (req, res, next) => {
  const { id, title, price, imageUrl, description } = req.body;
  console.log('BODY ', req.body);
  const product = new Product(title, price, imageUrl, description, new mongoDb.ObjectId(id));
  console.log('nre prod ', product);
    product.save().then((data) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getEditProductPage = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      res.render("admin/edit-product", {
        product: product,
        pageTitle: "Edit some stuff",
        editing: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAdminProductPage = (req, res, next) => {
  Product.fetchAll()
    .then((data) => {
      res.render("admin/admin-products", {
        prods: data,
        pageTitle: "Products",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.deleteById(productId)
    .then((data) => {
      res.redirect("/admin-products");
    })
    .catch((err) => console.log(err));
};
