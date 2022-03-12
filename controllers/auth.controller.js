import { createNewUser, login } from "../models/auth.model.js";

import { validationResult } from "express-validator";

export const getSignup = (req, res, next) => {
  res.render("signup", {
    authError: req.flash("authError")[0],
    validationErrors: req.flash("validationErrors"),
    isUser: req.session.userId,
  });
};

export const postSignup = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    createNewUser(req.body.username, req.body.email, req.body.password)
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        req.flash("authError", err);
        res.redirect("/signup");
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("signup");
  }
};

export const getLogin = (req, res, next) => {
  res.render("login", {
    authError: req.flash("authError")[0],
    validationErrors: req.flash("validationErrors"),
    isUser: req.session.userId,
  });
};

export const postLogin = (req, res, next) => {
  console.log(validationResult(req).array());
  if(validationResult(req).isEmpty()){
    login(req.body.email, req.body.password)
    .then((id) => {
      req.session.userId = id;
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("authError", err);
      res.redirect("/login");
    });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("login");
  }
};

export const logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
