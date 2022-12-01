exports.getHomePage = (req, res, next) => {
  res.render("shop/index", { pageTitle: "Home" });
};

exports.getOrdersPage = (req, res, next) => {
  req.user
    .getOrders({ include: ['products']})
    .then((orders) => {
      res.render("shop/orders", { pageTitle: "Orders", orders: orders });
    })
    .catch((err) => console.log(err));
};

exports.getProductsPage = (req, res, next) => {
  req.user
    .getProducts()
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
