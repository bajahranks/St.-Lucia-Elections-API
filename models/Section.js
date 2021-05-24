const mongoose = require('../config/db');

const sectionSchema = new mongoose.Schema({
    name: {
      desc: "The range of alphabets that will be voting in this particular section. Eg. A-H",
      trim: true,
      type: String,
      required: true,
      index: true
    },
    pollingStation: {
      desc: "The polling station the section is part of.",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PollingStation',
      required: true
    }
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

module.exports = mongoose.model('Section', sectionSchema);