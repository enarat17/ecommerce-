const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.MONGO_URI;

mongoose.connect(DB).then(() => {
  console.log("Connected to database successfully");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
