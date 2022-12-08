const Product = require("../models/product");
const mongoDb = require("mongodb");
const product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add some products",
    editing: false,
  });
};

exports.saveProducts = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  console.log(req.user);
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user._id
  });
  product
    .save()
    .then((data) => {
      res.redirect("/admin-products");
    })
    .catch((err) => console.log(err));
};

exports.saveUpdatedProduct = (req, res, next) => {
  const { id, title, price, imageUrl, description } = req.body;
  Product.findById(id).then(product => {
    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;

    product.save().then(() => {
      res.redirect('/admin-products');
    })
    .catch(err => console.log(err));
  });
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
  Product.find()
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
  Product.findByIdAndDelete(productId)
    .then((data) => {
      res.redirect("/admin-products");
    })
    .catch((err) => console.log(err));
};
