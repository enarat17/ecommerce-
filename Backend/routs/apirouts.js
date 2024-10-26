const express = require("express");
const app = express();
const productrouts = require("./productrouts");
const categories = require("./categories");
const orders = require("./orders");
const users = require("./users");
const reviews = require("./reviews");
const jwt = require("jsonwebtoken");

app.get("/clear_token", (req, res) => {
  try {
    return res.clearCookie("access_token").send("done clearing token");
  } catch (err) {
    return res.status(403).json({
      message: "their is no cookie available to delete",
    });
  }
});

app.get("/get_token", (req, res) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.JWT_SEC_KEY);
    console.log(decoded);
    return res.json({ isadmin: decoded.isadmin });
  } catch (err) {
    return res.status(403).json({
      message: "their is no cookie available",
    });
  }
});
app.use("/products", productrouts);
app.use("/category", categories);
app.use("/orders", orders);
app.use("/users", users);
app.use("/reviews", reviews);

module.exports = app;
