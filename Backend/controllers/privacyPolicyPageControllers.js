const PrivacyPolicyPage = require("./../models/privacyPolicyPage");
const factory = require("./FactoryHandlers");

exports.getPrivacyPolicyPage = factory.getAll(PrivacyPolicyPage);
exports.updatePrivacyPolicyPage = factory.updateOne(PrivacyPolicyPage);
exports.createPrivacyPolicyPage = factory.createOne(PrivacyPolicyPage);
