const express = require("express");
const connectDB = require("./config/db");
const Product = require("./modules/productmodule");
const apirouts = require("./routs/apirouts");
const fileupload = require("express-fileupload");
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 5000;
// const corsOptions = {
//   origin: "http://localhost:3000", // your client URL
//   credentials: true,
// };

app.use(express.json());
app.use(fileupload());
app.use(cookie_parser());

const corsOptions = {
  origin: "http://localhost:3000", // Adjust this to your client URL
  credentials: true, // This is crucial to allow credentials (cookies)
};

app.use(cors(corsOptions));
connectDB();

app.get("/", async (req, res, next) => {
  try {
    res.send("done server is running ");
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.access_token;

  console.log("token");
  console.log(token);
  next();
});

app.use("/api/v1", apirouts);

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(error);
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(port, (req, res, next) => {
  console.log(`Example app listening on port ${port}`);
});
