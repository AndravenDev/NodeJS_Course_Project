const order = require("../models/order");
const Product = require("../models/product");

exports.getCartPage = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Cart",
        cartItems: req.user.cart.items,
      });
    })
    .catch((err) => console.log(err));
};

exports.saveToCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findById(id)
    .then((prod) => {
      return req.user.addToCart(prod);
    })
    .then((result) => {
      console.log("result ", result);
      res.redirect("/product-list");
    })
    .catch((err) => console.log(err));
};

exports.removeFromCart = (req, res, next) => {
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
    .populate("cart.items.productId")
    .then((user) => {
      console.log();
      const products = user.cart.items.map((x) => {
        return { qty: x.qty, productData: x.productId._doc };
      });
      const currentOrder = new order({
        user: {
          name: req.user.name,
          userId: req.user._id,
        },
        products: products,
      });

      return currentOrder.save();
    })
    .then((cart) => {
      req.user.clearCart().then(() => {
        res.redirect("/orders");
      });
    })
    .catch((err) => console.log(err));
};
