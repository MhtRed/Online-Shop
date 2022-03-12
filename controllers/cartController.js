import { addNewItem } from "../models/cartModel.js";
import { validationResult } from "express-validator";
import { getItemsByUser, editItem, deleteItem } from "../models/cartModel.js";

export const postCart = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    addNewItem({
      name: req.body.name,
      price: req.body.price,
      amount: req.body.amount,
      userId: req.session.userId,
      productId: req.body.productId,
      timestamp: Date.now(),
    })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect(req.body.redirectTo);
  }
};

export const postSave = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    editItem(req.body.cartId, {
      amount: req.body.amount,
      timestamp: Date.now(),
    })
      .then(() => res.redirect("/cart"))
      .catch((err) => console.log(err));
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/cart");
  }
};

export const postDelete = (req, res, next) => {
  deleteItem(req.body.cartId)
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

export const getCart = (req, res, next) => {
  getItemsByUser(req.session.userId)
    .then((items) => {
      res.render("cart", {
        items,
        isUser: req.session.userId,
        validationErrors: req.flash("validationErrors")[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
