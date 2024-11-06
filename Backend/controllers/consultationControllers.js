const Consultation = require("../models/consultationModel");
const factory = require("./FactoryHandlers");

exports.createConsultation = factory.createOne(Consultation);
exports.getAllConsultations = factory.getAll(Consultation);
exports.getOneConsultation = factory.getOne(Consultation);
exports.updateConsultation = factory.updateOne(Consultation);
exports.deleteConsultation = factory.deleteOne(Consultation);
