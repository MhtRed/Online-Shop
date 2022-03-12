import express from "express";
import { getHome } from "../controllers/home.controller.js";


export const homeRouter = express.Router();

homeRouter.get("/", getHome);
