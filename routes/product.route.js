import express from "express";
import {
  getProduct,
  getFirstProduct,
} from "../controllers/product.controller.js";
export const productRouter = express.Router();

productRouter.get("/", getFirstProduct);
productRouter.get("/:id", getProduct);
