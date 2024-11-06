const mongoose = require("mongoose");

const headerImageModel = new mongoose.Schema({
  HR_Store: {
    type: String,
    required: true
  },
  Financial_Store: {
    type: String,
    required: true
  },
  storePage: {
    type: String,
    required: true
  },
  loggingPage: {
    type: String,
    required: true
  },
  blogsPage: {
    type: String,
    required: true
  },
  businessServices: {
    type: String,
    required: true
  },
  accountingServices: {
    type: String,
    required: true
  },
  auditingServices: {
    type: String,
    required: true
  },
  financialServices: {
    type: String,
    required: true
  },
  HrServices: {
    type: String,
    required: true
  },
  servicesPage: {
    type: String,
    required: true
  },
  aboutUsPage: {
    type: String,
    required: true
  }
});

const HeaderImage = mongoose.model("HeaderImage", headerImageModel);

module.exports = HeaderImage;
