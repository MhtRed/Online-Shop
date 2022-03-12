import {
  getProductsByCategory,
  getAllProducts,
} from "../models/products.model.js";

export const getHome = (req, res, next) => {
  let category = req.query.category;
  let validCategories = ["clothes", "phones", "computers"];
  let productPromise;

  productPromise =
    category && validCategories.includes(category)
      ? getProductsByCategory(category)
      : getAllProducts();
  productPromise.then((products) => {
    res.render("index", {
      products,
      isUser: req.session.userId,
      validationErrors: req.flash("validationErrors")[0],
    });
  });
};
