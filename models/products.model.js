import mongoose from "mongoose";

const DB_URL =
  "mongodb+srv://mouhti:hfcMoHN9cb5NWzjj@cluster0.awvip.mongodb.net/online-shop";

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
});

const Product = mongoose.model("product", productSchema);

export const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return Product.find({});
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

export const getProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return Product.find({ category });
      })
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

export const getProductsById = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return Product.findById(id);
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
