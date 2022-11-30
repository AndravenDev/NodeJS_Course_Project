const Product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add some products",
    editing: false,
  });
};

exports.getEditProductPage = (req, res, next) => {
  const id = req.params.id;
  req.user
    .getProducts({ where: { id: id } })
    .then((products) => {
      res.render("admin/edit-product", {
        product: products[0],
        pageTitle: "Edit some stuff",
        editing: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.saveUpdatedProduct = (req, res, next) => {
  const { id, title, price, imageUrl, desc } = req.body;

  Product.findAll({ where: { id: id } })
    .then((data) => {
      const product = data[0];
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = desc;
      return product.save();
    })
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getAdminProductPage = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render("admin/admin-products", {
        prods: data,
        pageTitle: "Products",
      });
    })
    .catch((err) => console.log(err));
};

exports.saveProducts = (req, res, next) => {
  const { title, imageUrl, price, desc } = req.body;
  req.user
    .createProduct({ title, imageUrl, price, description: desc })
    .then((data) => {
      res.redirect("/admin-products");
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.destroy({ where: { id: productId } })
    .then((data) => {
      res.redirect("/admin-products");
    })
    .catch((err) => console.log(err));
};
