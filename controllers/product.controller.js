import { getProductsById, getAllProducts } from "../models/products.model.js";

export const getProduct = (req, res, next) => {
  // get Id
  // get product
  // render

  let id = req.params.id;
  getProductsById(id).then((product) => {
    res.render("product", {
      product: product,
      isUser: req.session.userId,
    });
  });
};

export const getFirstProduct = (req, res, next) => {
  getAllProducts().then((product) => {
    res.render("product", {
      product: product[0],
    });
  });
};
