import express from "express";
import bodyParser from "body-parser";
import { isAuth } from "./guards/auth.guards.js";
import validator from "express-validator";
import { postCart,postSave, getCart, postDelete } from "../controllers/cartController.js";

export const cartRouter = express.Router();

const check = validator.check;

cartRouter.get("/", isAuth, getCart);

cartRouter.post(
  "/",
  isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .notEmpty()
    .withMessage("Please put an amount of the product")
    .isInt({ min: 1 })
    .withMessage("The amount must be greater than zero"),
  postCart
);

cartRouter.post(
  "/save",
  isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .notEmpty()
    .withMessage("Please put the amount of the product")
    .isInt({ min: 1 })
    .withMessage("The amount must be greater than zero"),
  postSave
);

cartRouter.post(
  "/delete",
  isAuth,
  bodyParser.urlencoded({ extended: true }),
  postDelete
);
