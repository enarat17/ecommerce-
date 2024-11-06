const fs = require("fs");
const path = require("path");
const catchAsync = require("../utils/catchAsync");
const HeaderImage = require("../models/headerImageModel");
const factory = require("./FactoryHandlers");

exports.uploadHeaderImages = catchAsync(async (req, res) => {
  const { files } = req;

  const headerImageData = {};

  if (files.HR_Store) headerImageData.HR_Store = files.HR_Store[0].filename;
  if (files.Financial_Store)
    headerImageData.Financial_Store = files.Financial_Store[0].filename;
  if (files.storePage) headerImageData.storePage = files.storePage[0].filename;
  if (files.loggingPage)
    headerImageData.loggingPage = files.loggingPage[0].filename;
  if (files.blogsPage) headerImageData.blogsPage = files.blogsPage[0].filename;
  if (files.businessServices)
    headerImageData.businessServices = files.businessServices[0].filename;
  if (files.accountingServices)
    headerImageData.accountingServices = files.accountingServices[0].filename;
  if (files.auditingServices)
    headerImageData.auditingServices = files.auditingServices[0].filename;
  if (files.financialServices)
    headerImageData.financialServices = files.financialServices[0].filename;
  if (files.HrServices)
    headerImageData.HrServices = files.HrServices[0].filename;
  if (files.servicesPage)
    headerImageData.servicesPage = files.servicesPage[0].filename;
  if (files.aboutUsPage)
    headerImageData.aboutUsPage = files.aboutUsPage[0].filename;

  const headerImage = await HeaderImage.create(headerImageData);

  res.status(200).json({
    status: "success",
    data: {
      headerImage
    }
  });
});

const deleteFiles = files => {
  files.forEach(file => {
    const filePath = path.join("../frontend/public/imgs/images", file);
    fs.unlink(filePath, err => {
      if (err) {
        console.error(`Failed to delete file: ${file}`, err);
      }
    });
  });
};

exports.updateHeaderImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { files } = req;

  // Find the existing document
  const headerImage = await HeaderImage.findById(id);
  if (!headerImage) {
    return res.status(404).json({
      status: "fail",
      message: "Header image not found"
    });
  }

  // Track the old file paths to delete later
  const oldFiles = [];

  // Update fields if new files are provided
  if (files.HR_Store) {
    oldFiles.push(headerImage.HR_Store); // Track old file
    headerImage.HR_Store = files.HR_Store[0].filename;
  }
  if (files.Financial_Store) {
    oldFiles.push(headerImage.Financial_Store);
    headerImage.Financial_Store = files.Financial_Store[0].filename;
  }
  if (files.storePage) {
    oldFiles.push(headerImage.storePage);
    headerImage.storePage = files.storePage[0].filename;
  }
  if (files.loggingPage) {
    oldFiles.push(headerImage.loggingPage);
    headerImage.loggingPage = files.loggingPage[0].filename;
  }
  if (files.blogsPage) {
    oldFiles.push(headerImage.blogsPage);
    headerImage.blogsPage = files.blogsPage[0].filename;
  }
  if (files.businessServices) {
    oldFiles.push(headerImage.businessServices);
    headerImage.businessServices = files.businessServices[0].filename;
  }
  if (files.accountingServices) {
    oldFiles.push(headerImage.accountingServices);
    headerImage.accountingServices = files.accountingServices[0].filename;
  }
  if (files.auditingServices) {
    oldFiles.push(headerImage.auditingServices);
    headerImage.auditingServices = files.auditingServices[0].filename;
  }
  if (files.financialServices) {
    oldFiles.push(headerImage.financialServices);
    headerImage.financialServices = files.financialServices[0].filename;
  }
  if (files.HrServices) {
    oldFiles.push(headerImage.HrServices);
    headerImage.HrServices = files.HrServices[0].filename;
  }
  if (files.servicesPage) {
    oldFiles.push(headerImage.servicesPage);
    headerImage.servicesPage = files.servicesPage[0].filename;
  }
  if (files.aboutUsPage) {
    oldFiles.push(headerImage.aboutUsPage);
    headerImage.aboutUsPage = files.aboutUsPage[0].filename;
  }
  // Save the updated document
  await headerImage.save();

  // Delete the old files after the new paths are saved
  deleteFiles(oldFiles);

  res.status(200).json({
    status: "success",
    data: {
      headerImage
    }
  });
});

exports.getHeaderImages = factory.getAll(HeaderImage);
