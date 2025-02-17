require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => console.log(err));
};

module.exports = connectDB;
