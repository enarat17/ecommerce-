require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 30000,
      // socketTimeoutMS: 45000,
      // Increase the socket timeout to 45 seconds  //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("done connect 👍");
  } catch (error) {
    console.error(error);
    console.log("error 😢");
  }
};

module.exports = connectDB;
