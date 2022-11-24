const Product = require("../models/product");

exports.getHomePage = (req, res, next) => {
  res.render("shop/index", { pageTitle: "Home" });
}

exports.getCartPage = (req, res, next) => {
  res.render("shop/cart", { pageTitle: "Cart" });
}

exports.getOrdersPage = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders" });
}

exports.getProductsPage = (req, res, next) => {
  Product.getAllProducts((data) => {
    res.render("shop/product-list", { prods: data, pageTitle: "Products" });
  });
};

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/add-product", { pageTitle: "Add some products" });
};

exports.getAdminProductPage = (req, res, next) => {
  Product.getAllProducts((data) => {
    console.log('dataa ', data);
    res.render("admin/admin-products", { prods: data, pageTitle: "Products" });
  });
};

exports.saveProducts = (req, res, next) => {
  const {title, imageUrl, price, desc} = req.body;
  const newProduct = new Product(title, imageUrl, price, desc);
  newProduct.save();
  res.redirect("/add-product");
};
