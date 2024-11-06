const mongoose = require("mongoose");

const infoFileSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true
  }
});

const InfoFile = mongoose.model("infoFile", infoFileSchema);

module.exports = InfoFile;
