const Contact = require("../utils/contact");
const factory = require("./FactoryHandlers");
const catchAsync = require("../utils/catchAsync");
const AdminEmail = require("../models/adminEmails");

exports.inquiryEmail = catchAsync(async (req, res) => {
  const { email, phone, subject, message } = req.body;
  const { file } = req;

  // Validate the input
  if (!email || !phone || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Define the email type based on the subject (this can be enhanced based on the use case)
  let emailType = "inquiry";
  if (subject.toLowerCase().includes("complaint")) {
    emailType = "complaint";
  }
  if (subject.toLowerCase().includes("store")) {
    emailType = "store";
  }

  // Fetch the corresponding admin email for the emailType
  const adminEmail = await AdminEmail.findOne({ type: emailType });

  if (!adminEmail) {
    return res
      .status(500)
      .json({ error: "No recipient email configured for this type" });
  }

  // Send the email
  const user = { email, phone };
  const contactEmail = new Contact(
    user,
    subject,
    message,
    file,
    adminEmail.email
  );

  await contactEmail.send();

  res.status(200).json({
    status: "success",
    message: "Email sent successfully"
  });
});

exports.createAdminEmail = factory.createOne(AdminEmail);

exports.updateAdminEmail = catchAsync(async (req, res) => {
  const updates = req.body;

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ message: "No update data provided" });
  }

  // Iterate over each update request
  const updatePromises = updates.map(async update => {
    const { id, ...updateFields } = update;

    if (!id || Object.keys(updateFields).length === 0) {
      throw new Error("Invalid update data");
    }

    // Update the document with the provided fields
    return AdminEmail.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );
  });

  // Wait for all updates to complete
  const updatedEmails = await Promise.all(updatePromises);

  res.status(200).json({ message: "success", data: updatedEmails });
});

exports.deleteAdminEmail = catchAsync(async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "No IDs provided" });
  }

  // Iterate over each ID and delete the corresponding document
  const deletePromises = ids.map(async id => {
    if (!id) {
      throw new Error("Invalid ID provided");
    }

    // Find and delete the document by ID
    return AdminEmail.findByIdAndDelete(id);
  });

  // Wait for all deletions to complete
  await Promise.all(deletePromises);

  res.status(200).json({ message: "success", data: null });
});

exports.getAdminEmails = factory.getAll(AdminEmail);
