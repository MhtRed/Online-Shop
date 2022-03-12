//Importing Modules
import express from "express";
import path from "path";

import session from "express-session";
import connectMongodbSession from "connect-mongodb-session";
const SessionStore = connectMongodbSession(session);

import { homeRouter } from "./routes/home.route.js";
import { productRouter } from "./routes/product.route.js";
import { authRouter } from "./routes/auth.route.js";
import { cartRouter } from "./routes/cart.route.js";

import flash from "connect-flash";

//Setting Express App
const app = express();
//Path to static folders
app.use(express.static(path.join(path.resolve(), "assets")));
app.use(express.static(path.join(path.resolve(), "images")));
app.use(flash());

const STORE = new SessionStore({
  uri: "mongodb+srv://mouhti:hfcMoHN9cb5NWzjj@cluster0.awvip.mongodb.net/online-shop",
  collection: "sessions",
});

app.use(
  "/",
  session({
    secret: "this is my secret to hash express sessions",
    resave: true,
    saveUninitialized: false,
    store: STORE,
  })
);

app.set("view engine", "ejs"); // Template Engine
app.set("views", "views"); // Default value of views

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

// Listening
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
