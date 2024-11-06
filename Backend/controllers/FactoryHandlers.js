const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

const deleteFiles = files => {
  files.forEach(file => {
    let filePath = "./../frontend/public/"; // Base directory

    // Determine the subdirectory based on the file extension
    const fileExtension = path.extname(file).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(fileExtension)) {
      filePath = path.join(filePath, "imgs/images", file); // Images go to /imgs/images
    } else if (
      [".pdf", ".xls", ".xlsx", ".doc", ".docx", ".xlsm"].includes(
        fileExtension
      )
    ) {
      filePath = path.join(filePath, "documents", file); // Documents go to /documents
    } else {
      filePath = path.join(filePath, file); // Other files go to the base path
    }

    // Delete the file
    fs.unlink(filePath, err => {
      if (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
      }
    });
  });
};

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    // Collect files to be deleted
    const filesToDelete = [];
    if (doc.coverImage) filesToDelete.push(doc.coverImage);
    if (doc.file) filesToDelete.push(doc.file);
    if (doc.images && doc.images.length > 0) filesToDelete.push(...doc.images);
    if (doc.memberImage) filesToDelete.push(doc.memberImage);
    if (doc.clientImage) filesToDelete.push(doc.clientImage);
    await Model.findByIdAndDelete(req.params.id);

    // Delete the files
    deleteFiles(filesToDelete);
    res.status(204).json({
      status: "success",
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const { files } = req;
    const updatedData = { ...req.body };

    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    const filesToDelete = [];

    if (files) {
      // Handle cover image
      if (files.coverImage && files.coverImage.length > 0) {
        if (doc.coverImage) filesToDelete.push(doc.coverImage);
        updatedData.coverImage = files.coverImage[0].filename;
      }

      // Handle images array
      if (files.images && files.images.length > 0) {
        if (doc.images) filesToDelete.push(...doc.images);
        updatedData.images = files.images.map(file => file.filename);
      }

      // Handle file (document)
      if (files.file && files.file.length > 0) {
        if (doc.file) filesToDelete.push(doc.file);
        updatedData.file = files.file[0].filename;
      }
    }

    const updatedDoc = await Model.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true
      }
    );

    if (filesToDelete.length > 0) {
      deleteFiles(filesToDelete);
    }

    res.status(200).json({
      status: "success",
      data: {
        data: updatedDoc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const { files } = req;
    const newData = { ...req.body };

    if (files) {
      if (files.coverImage && files.coverImage.length > 0) {
        newData.coverImage = files.coverImage[0].filename;
      }
      if (files.image && files.image.length > 0) {
        newData.image = files.image[0].filename;
      }

      if (files.images && files.images.length > 0) {
        newData.images = files.images.map(file => file.filename);
      }

      if (files.file && files.file.length > 0) {
        newData.file = files.file[0].filename;
      }
    }

    const doc = await Model.create(newData);

    res.status(201).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let query;

    if (mongoose.Types.ObjectId.isValid(id)) {
      query = Model.findById(id);
    } else {
      query = Model.findOne({ slug: id });
    }

    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    if (!doc || doc.length === 0) {
      return next(new AppError("Data not found", 404));
    }

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
