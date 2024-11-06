const InfoFile = require("../models/infoFileModel");
const factory = require("./FactoryHandlers");

exports.uploadFile = factory.createOne(InfoFile);

exports.getFile = factory.getOne(InfoFile);

exports.deleteFile = factory.deleteOne(InfoFile);

exports.updateFile = factory.updateOne(InfoFile);
