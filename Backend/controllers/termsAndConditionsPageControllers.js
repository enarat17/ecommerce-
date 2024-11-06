const TermsAndConditionsPage = require("./../models/termsAndConditionsPage");
const factory = require("./FactoryHandlers");

exports.getTermsAndConditionsPage = factory.getAll(TermsAndConditionsPage);
exports.updateTermsAndConditionsPage = factory.updateOne(
  TermsAndConditionsPage
);
exports.createTermsAndConditionsPage = factory.createOne(
  TermsAndConditionsPage
);
