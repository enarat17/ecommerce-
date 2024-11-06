const factory = require("./FactoryHandlers");
const Contact = require("../models/contactsModel");

exports.createContactInfo = factory.createOne(Contact);
exports.getContactInfo = factory.getAll(Contact);
exports.updateContactInfo = factory.updateOne(Contact);
exports.deleteContactInfo = factory.deleteOne(Contact);
