const mongoose = require("mongoose");

const clientsSchema = new mongoose.Schema({
  name_AR: {
    type: String,
    required: true
  },
  name_EN: {
    type: String,
    required: true
  },
  clientImage: {
    type: String
  }
});

const clientsPageSchema = new mongoose.Schema({
  coverImage: {
    type: String,
    required: true
  },
  clients: [clientsSchema]
});

const Client = mongoose.model("ClientsPage", clientsPageSchema);

module.exports = Client;
