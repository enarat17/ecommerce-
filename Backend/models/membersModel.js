const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name_AR: {
    type: String,
    required: true,
    trim: true
  },
  name_EN: {
    type: String,
    required: true,
    trim: true
  },
  position_AR: {
    type: String,
    required: true
  },
  position_EN: {
    type: String,
    required: true
  },
  memberImage: {
    type: String,
    required: true
  },
  brief_AR: {
    type: String,
    trim: true
  },
  brief_EN: {
    type: String,
    trim: true
  },
  isFounder: {
    type: Boolean,
    default: false
  }
});

const membersPagaSchema = new mongoose.Schema({
  coverImage: {
    type: String,
    required: true
  },
  members: [memberSchema]
});

const MembersPage = mongoose.model("MembersPage", membersPagaSchema);

module.exports = MembersPage;
