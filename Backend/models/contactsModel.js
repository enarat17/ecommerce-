const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
  coverImage: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
    validate: {
      validator: v => validator.isURL(v),
      message: "Invalid URL"
    }
  },
  twitter: {
    type: String,
    validate: {
      validator: v => validator.isURL(v),
      message: "Invalid URL"
    }
  },
  whatsapp: String,
  phone: {
    type: String,
    validate: {
      validator: v => validator.isMobilePhone(v),
      message: "Invalid phone number"
    }
  },
  email: {
    type: String,
    validate: {
      validator: v => validator.isEmail(v),
      message: "Invalid email"
    }
  },
  linkedin: {
    type: String,
    validate: {
      validator: v => validator.isURL(v),
      message: "Invalid URL"
    }
  }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
