const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getHomePage = (req, res, next) => {
  res.render("shop/index", { pageTitle: "Home" });
}

exports.getCartPage = (req, res, next) => {
  Cart.getCartProducts((cartItems => {
    Product.getAllProducts((allProducts) => {
      const cItems = [];
      for(product in allProducts){
        if(cartItems.products.find(x => x.id === allProducts[product].id)){
          cItems.push({product: allProducts[product], qty: cartItems.products.find(x => x.id === allProducts[product].id).qty});
        }
      } 
      console.log('draste ', cItems);
      res.render("shop/cart", { pageTitle: "Cart", cartItems: cItems });
    });
  }));
}

exports.saveToCart = (req, res, next) => {
  const id = req.body.productId;
  Product.getProductById(id, (product) => {
    Cart.addProduct(product.id, product.price);
    res.redirect('/product-list')
  });
}

exports.removeItemFromCart = (req, res, next) => {
  const id = req.params.id;
  Product.getProductById(id, (product) => {
    Cart.deleteProduct(product.id, product.price)
    res.redirect('/cart');
  })
}

exports.getOrdersPage = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders" });
}

exports.getProductsPage = (req, res, next) => {
  Product.getAllProducts((data) => {
    res.render("shop/product-list", { prods: data, pageTitle: "Products" });
  });
};

exports.getDetailsPage = (req, res, next) => {
  const id = req.params.id;
  Product.getProductById(id, (product) => {
    console.log('ddddd', product);
    res.render("shop/product-details", { product: product, pageTitle: "Details" });
  })
}

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", { pageTitle: "Add some products", editing: false });
};

exports.getEditProductPage = (req, res, next) => {
  Product.getProductById(req.params.id, (product) => {
    res.render("admin/edit-product", { pageTitle: "Edit some stuff", product: product, editing: true });
  })
};

exports.saveUpdatedProduct = (req, res, next) => {
  const { id, title, price, imageUrl, desc } = req.body
  const updatedProduct = new Product(id, title, imageUrl, price, desc);
  console.log(updatedProduct);
  updatedProduct.save();
  res.redirect('/');
}

exports.getAdminProductPage = (req, res, next) => {
  Product.getAllProducts((data) => {
    res.render("admin/admin-products", { prods: data, pageTitle: "Products" });
  });
};

exports.saveProducts = (req, res, next) => {
  const {title, imageUrl, price, desc} = req.body;
  const newProduct = new Product(null, title, imageUrl, price, desc);
  newProduct.save();
  res.redirect("/add-product");
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.deleteById(productId);
  res.redirect('/admin-products');
}
