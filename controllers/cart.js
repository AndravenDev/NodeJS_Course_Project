const Product = require("../models/product");

exports.getCartPage = (req, res, next) => {
  let cartItemIds = req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", { pageTitle: "Cart", cartItems: products });
    })
    .catch((err) => console.log(err));
  console.log(cartItemIds);
};

exports.saveToCart = (req, res, next) => {
  const id = req.body.productId;
  console.log("heyyyyyy ", id);
  Product.findById(id)
    .then((prod) => {
      console.log(prod);
      return req.user.addToCart(prod);
    })
    .then((result) => {
      console.log("result ", result);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.removeItemFromCart = (req, res, next) => {
  const id = req.params.id;
  req.user
    .removeFromCart(id)
    .then((cart) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then((cart) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
