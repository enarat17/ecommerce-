/* eslint-disable camelcase */
const fs = require("fs");
const path = require("path");
const catchAsync = require("../utils/catchAsync");
const Client = require("./../models/clientModel");
const factory = require("./FactoryHandlers");

const deleteFiles = files => {
  files.forEach(file => {
    fs.unlink(path.join("./../frontend/public/imgs/images", file), err => {
      if (err) console.error(`Failed to delete file: ${file}`, err);
    });
  });
};

exports.getAllClients = factory.getAll(Client);

exports.getOneClient = catchAsync(async (req, res) => {
  const { id } = req.params;

  // Find the MembersPage document
  const clientsPage = await Client.findOne();

  if (!clientsPage) {
    return res.status(404).json({
      status: "fail",
      message: "Members page not found"
    });
  }

  let client;

  // If an id is provided, try to find the member within the members array by ID
  if (id) {
    client = clientsPage.clients.id(id);
    if (!client && !req.files.coverImage) {
      return res.status(404).json({
        status: "fail",
        message: "Member not found"
      });
    }
  }

  // Success response
  return res.status(200).json(client);
});

exports.createClient = catchAsync(async (req, res) => {
  const clientData = {
    name_AR: req.body.name_AR,
    name_EN: req.body.name_EN,
    clientImage: req.files.clientImage
      ? req.files.clientImage[0].filename
      : null
  };

  let clientsPage = await Client.findOne();
  if (!clientsPage) {
    clientsPage = new Client({
      coverImage: req.files.coverImage
        ? req.files.coverImage[0].filename
        : null,
      clients: []
    });
  }

  clientsPage.clients.push(clientData);
  await clientsPage.save();

  res.status(201).json(clientsPage);
});

exports.updateClient = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name_AR, name_EN } = req.body;

  // Find the ClientsPage document
  const clientsPage = await Client.findOne();
  if (!clientsPage) {
    return res.status(404).json({
      status: "fail",
      message: "Clients page not found"
    });
  }

  let client;
  const filesToDelete = [];

  // If an id is provided, find the client within the clients array by ID
  if (id) {
    client = clientsPage.clients.id(id);
    if (!client) {
      return res.status(404).json({
        status: "fail",
        message: "Client not found"
      });
    }
  }

  // If client was found, update its fields
  if (client) {
    if (name_AR) client.name_AR = name_AR;
    if (name_EN) client.name_EN = name_EN;

    if (req.files.clientImage.length) {
      if (client.clientImage) {
        filesToDelete.push(client.clientImage); // Store old file path for deletion
      }
      client.clientImage = req.files.clientImage[0].filename;
    }
  }

  // Update cover image if provided
  if (req.files.coverImage.length) {
    if (clientsPage.coverImage) {
      filesToDelete.push(clientsPage.coverImage); // Store old file path for deletion
    }
    clientsPage.coverImage = req.files.coverImage[0].filename;
  }
  // Save the updated ClientsPage document
  await clientsPage.save();

  // Delete the old files after the document is saved
  if (filesToDelete.length > 0) {
    deleteFiles(filesToDelete);
  }

  res.status(200).json({
    status: "success",
    data: {
      client: client || null, // Return client if updated, null otherwise
      coverImage: clientsPage.coverImage // Return the updated coverImage
    }
  });
});

exports.deleteClient = catchAsync(async (req, res) => {
  const { id } = req.params;

  // Find the ClientsPage document
  const clientsPage = await Client.findOne();

  if (!clientsPage) {
    return res.status(404).json({
      status: "fail",
      message: "Clients page not found"
    });
  }

  // Find the client within the clients array by ID
  const client = clientsPage.clients.id(id);

  if (!client) {
    return res.status(404).json({
      status: "fail",
      message: "Client not found"
    });
  }

  // Prepare file deletion if client has an associated image
  const filesToDelete = [];
  if (client.clientImage) {
    filesToDelete.push(client.clientImage);
  }

  // Remove the client from the clients array
  clientsPage.clients.pull(id);

  // Save the updated document before deleting the files
  await clientsPage.save();

  // Delete the old files after saving the document
  if (filesToDelete.length > 0) {
    deleteFiles(filesToDelete);
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});
