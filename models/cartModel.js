import mongoose from "mongoose";
const DB_URL =
  "mongodb+srv://mouhti:hfcMoHN9cb5NWzjj@cluster0.awvip.mongodb.net/online-shop";

const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestamp: Number,
});

const CartItem = mongoose.model("cart", cartSchema);

export const addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        let item = new CartItem(data);
        return item.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

export const getItemsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() =>
        CartItem.find({ userId: userId }, {}, { sort: { timestamp: -1 } })
      )
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

export const editItem = (id, newData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => 
        CartItem.updateOne({ _id: id }, newData)
      )
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

export const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => 
        CartItem.findByIdAndDelete(id)
      )
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
