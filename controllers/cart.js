const Cart = require("../models/cart");
const Product = require("../models/product");

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
