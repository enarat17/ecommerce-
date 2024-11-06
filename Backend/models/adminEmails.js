const mongoose = require("mongoose");

const adminEmailSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["inquiry", "complaint", "store"]
  },
  email: {
    type: String,
    required: true
  }
});

const AdminEmail = mongoose.model("AdminEmail", adminEmailSchema);

module.exports = AdminEmail;
