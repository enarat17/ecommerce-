const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  country: { type: String },
  zipcode: { type: Number },
  city: { type: String },
  pass: { type: String, required: true },
  isadmin: { type: Boolean, default: false },
});
const user = mongoose.model("user", userSchema);

module.exports = user;
