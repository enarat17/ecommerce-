/* eslint-disable camelcase */
const fs = require("fs");
const path = require("path");
const factory = require("./FactoryHandlers");
const MembersPage = require("../models/membersModel");
const catchAsync = require("../utils/catchAsync");

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

exports.getAllMembers = factory.getAll(MembersPage);

exports.deleteMember = catchAsync(async (req, res) => {
  const page = await MembersPage.findOne();
  if (!page) {
    return res.status(404).json({ message: "Members page not found" });
  }

  const memberIndex = page.members.findIndex(
    member => member._id.toString() === req.params.memberId
  );
  if (memberIndex === -1) {
    return res.status(404).json({ message: "Member not found" });
  }
  const deletedMember = page.members[memberIndex];

  // Delete member's image
  if (deletedMember.memberImage) {
    await deleteFiles([deletedMember.memberImage]);
  }

  page.members.splice(memberIndex, 1);
  await page.save();

  res.status(204).json({ message: "Member deleted successfully" });
});

exports.createMember = catchAsync(async (req, res) => {
  const memberData = {
    name_AR: req.body.name_AR,
    name_EN: req.body.name_EN,
    position_AR: req.body.position_AR,
    position_EN: req.body.position_EN,
    brief_AR: req.body.brief_AR,
    brief_EN: req.body.brief_EN,
    isFounder: req.body.isFounder,
    memberImage: req.files.memberImage
      ? req.files.memberImage[0].filename
      : null
  };

  let membersPage = await MembersPage.findOne();
  if (!membersPage) {
    membersPage = new MembersPage({
      coverImage: req.files.coverImage
        ? req.files.coverImage[0].filename
        : null,
      members: []
    });
  }

  membersPage.members.push(memberData);
  await membersPage.save();

  res.status(201).json(membersPage);
});

exports.getMember = catchAsync(async (req, res) => {
  const { id } = req.params;

  // Find the MembersPage document
  const membersPage = await MembersPage.findOne();

  if (!membersPage) {
    return res.status(404).json({
      status: "fail",
      message: "Members page not found"
    });
  }

  let member;

  // If an id is provided, try to find the member within the members array by ID
  if (id) {
    member = membersPage.members.id(id);
    if (!member && !req.files.coverImage) {
      return res.status(404).json({
        status: "fail",
        message: "Member not found"
      });
    }
  }
  // Success response
  res.status(200).json(member);
});

exports.updateMember = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {
    name_AR,
    name_EN,
    position_AR,
    position_EN,
    brief_AR,
    brief_EN,
    isFounder
  } = req.body;

  // Find the MembersPage document
  const membersPage = await MembersPage.findOne();

  if (!membersPage) {
    return res.status(404).json({
      status: "fail",
      message: "Members page not found"
    });
  }

  let member;
  let updatedCoverImage = false;

  // If an id is provided, try to find the member within the members array by ID
  if (id) {
    member = membersPage.members.id(id);
    if (!member) {
      return res.status(404).json({
        status: "fail",
        message: "Member not found"
      });
    }
  }

  // Update the member fields
  if (member) {
    if (name_AR) member.name_AR = name_AR;
    if (name_EN) member.name_EN = name_EN;
    if (position_AR) member.position_AR = position_AR;
    if (position_EN) member.position_EN = position_EN;
    if (brief_AR) member.brief_AR = brief_AR;
    if (brief_EN) member.brief_EN = brief_EN;
    if (isFounder !== undefined) member.isFounder = isFounder;

    // Update the member image if a new image is provided
    if (req.files && req.files.memberImage && req.files.memberImage[0]) {
      // Delete old member image
      if (member.memberImage) {
        deleteFiles([member.memberImage]);
      }
      member.memberImage = req.files.memberImage[0].filename;
    }
  }

  // Update the cover image of the members page if provided
  if (req.files && req.files.coverImage && req.files.coverImage[0]) {
    // Delete old cover image
    if (membersPage.coverImage) {
      deleteFiles([membersPage.coverImage]);
    }
    membersPage.coverImage = req.files.coverImage[0].filename;
    updatedCoverImage = true;
  }

  // Save the updated MembersPage document
  await membersPage.save();

  res.status(200).json({
    status: "success",
    data: {
      member: member || null, // Only return member data if a member was updated
      coverImage: updatedCoverImage ? membersPage.coverImage : undefined
    }
  });
});
