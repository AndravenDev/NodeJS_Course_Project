const Product = require("../models/product");

exports.getCartPage = (req, res, next) => {
  req.user.getCart().then((cart) =>
    cart.getProducts().then((products) => {
      res.render("shop/cart", { pageTitle: "Cart", cartItems: products });
    })
  );
};

exports.saveToCart = (req, res, next) => {
  const id = req.body.productId;
  let currentCart;
  req.user
    .getCart()
    .then((cart) => {
      currentCart = cart;
      return cart.getProducts({ where: { id: id } });
    })
    .then((products) => {
      let product;
      if (products.length) {
        product = products[0];
      }
      let newQty = 1;
      if (product) {
        const oldQty = product.cartItem.qty;
        newQty = oldQty + 1;
        return currentCart.addProduct(product, { through: { qty: newQty } });
      }

      return Product.findByPk(id).then((prod) => {
        return currentCart.addProduct(prod, { through: { qty: newQty } });
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.removeItemFromCart = (req, res, next) => {
  const id = req.params.id;
  req.user
    .getCart()
    .then((cart) => {
      cart
        .getProducts({ where: { id: id } })
        .then((toBeDeleted) => {
          const productToBeGOne = toBeDeleted[0];
          productToBeGOne.cartItem.destroy();
        })
        .then(() => {
          res.redirect("/cart");
        });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let currentCart;
  req.user
    .getCart()
    .then((cart) => {
      currentCart = cart;
      return cart.getProducts();
    })
    .then((cartProducts) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(cartProducts.map(cartProduct => {
            cartProduct.orderItem = { qty: cartProduct.cartItem.qty };
           return cartProduct
          }));
        })
        .catch((err) => console.log(err));
    })
    .then(nzBrat => {
      return currentCart.setProducts(null)
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => console.log(err));
};
