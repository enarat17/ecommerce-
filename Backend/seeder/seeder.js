require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const category = require("../modules/categorymodule");
const product = require("../modules/productmodule");
const review = require("../modules/reviewmodule");
const user = require("../modules/usermodule");
const order = require("../modules/ordermodule");

const categorydata = require("../seeder/category");
const productdata = require("../seeder/product");
const reviewsdata = require("../seeder/reviews");
const userdata = require("../seeder/user");
const ordersdata = require("../seeder/orders");

connectDB();

const importdata = async () => {
  try {
    await category.collection.dropIndexes();
    await product.collection.dropIndexes();

    await category.collection.deleteMany({});
    await product.collection.deleteMany({});
    await review.collection.deleteMany({});
    await user.collection.deleteMany({});
    await order.collection.deleteMany({});

    await category.insertMany(categorydata);
    await product.insertMany(productdata);
    await review.insertMany(reviewsdata);
    await user.insertMany(userdata);
    await order.insertMany(ordersdata);

    console.log("done inmporting ✔");
    process.exit();
  } catch (err) {
    console.log(err);
    console.log("write data to data base error 😨");
    process.exit(1);
  }
};
importdata();
