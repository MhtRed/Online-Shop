import express from "express";
import bodyParser from "body-parser";
import validator from "express-validator";
import {notAuth, isAuth} from "./guards/auth.guards.js"

import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  logout,
} from "../controllers/auth.controller.js";

const check = validator.check;

export const authRouter = express.Router();

authRouter.get("/signup", notAuth, getSignup);
authRouter.post(
  "/signup", notAuth,
  bodyParser.urlencoded({ extended: true }),
  check("username").notEmpty().withMessage("A username is required"),
  check("email").isEmail().withMessage("A valid email is required"),
  check("password")
    .isLength(3)
    .withMessage("The password length must be at least 3"),
  check("confirmpassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("The two passwords do not match"),
  postSignup
);
authRouter.get("/login", notAuth, getLogin);
authRouter.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  check("email").isEmail().withMessage("A valid email is required"),
  check("password")
    .isLength(3)
    .withMessage("The password length must be at least 3"),
  postLogin
);
authRouter.all("/logout",isAuth, logout);
