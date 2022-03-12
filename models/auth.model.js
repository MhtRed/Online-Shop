import mongoose from "mongoose";
import bcrypt from "bcrypt";

const DB_URL =
  "mongodb+srv://mouhti:hfcMoHN9cb5NWzjj@cluster0.awvip.mongodb.net/online-shop";

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

export const createNewUser = (username, email, password) => {
  //check if email already exists?
  // yes --> Error message
  // No --> Create New account

  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          console.log("This email already exists");
          reject("This email already exists");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashedPassword) => {
        let user = new User({
          username,
          email,
          password: hashedPassword,
        });
        return user.save();
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

export const login = (email, password) => {
  // check for email
  // no --> Error
  // yes --> check for password
  // no --> Password Error
  // yes --> set session

  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("None valid Email. Please try agin!");
        } else {
          bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("The password is not correct. Please try again!");
            } else {
              mongoose.disconnect();
              resolve(user._id);
            }
          });
        }
      })
      .catch((err) => {
        mongoose.disconnect;
        reject(err);
      });
  });
};
