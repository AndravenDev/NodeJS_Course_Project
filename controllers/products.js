const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");

exports.getHomePage = (req, res, next) => {
  res.render("shop/index", { pageTitle: "Home" });
};

exports.getCartPage = (req, res, next) => {
  Cart.getCartProducts((cartItems) => {
    Product.getAllProducts((allProducts) => {
      const cItems = [];
      for (product in allProducts) {
        if (cartItems.products.find((x) => x.id === allProducts[product].id)) {
          cItems.push({
            product: allProducts[product],
            qty: cartItems.products.find(
              (x) => x.id === allProducts[product].id
            ).qty,
          });
        }
      }
      console.log("draste ", cItems);
      res.render("shop/cart", { pageTitle: "Cart", cartItems: cItems });
    });
  });
};

exports.saveToCart = (req, res, next) => {
  const id = req.body.productId;
  Product.getProductById(id, (product) => {
    Cart.addProduct(product.id, product.price);
    res.redirect("/product-list");
  });
};

exports.removeItemFromCart = (req, res, next) => {
  const id = req.params.id;
  Product.getProductById(id, (product) => {
    Cart.deleteProduct(product.id, product.price);
    res.redirect("/cart");
  });
};

exports.getOrdersPage = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders" });
};

exports.getProductsPage = (req, res, next) => {
  req.user.getProducts()
    .then((data) => {
      console.log("DATA ", data);
      res.render("shop/product-list", { prods: data, pageTitle: "Products" });
    })
    .catch((err) => console.log(err));
};

exports.getDetailsPage = (req, res, next) => {
  const id = req.params.id;
  Product.findAll({ where: { id: id } })
    .then((products) => {
      res.render("shop/product-details", {
        product: products[0],
        pageTitle: "Details",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add some products",
    editing: false,
  });
};

exports.getEditProductPage = (req, res, next) => {
  const id = req.params.id;
  req.user.getProducts({where: { id: id }})
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
