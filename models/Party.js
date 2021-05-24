const mongoose = require('../config/db');

const partySchema = new mongoose.Schema(
  {
    name: {
      desc: "The party's name.",
      trim: true,
      type: String,
      index: true,
      unique: true,
      required: true
    },
    abbreviation: {
      desc: "An abbreviation of the party's name",
      trim: true,
      type: String
    },
    description: {
      desc: "A description of the party",
      trim: true,
      type: String
    },
    colour: {
      desc: "The colour affiliated with the party",
      trim: true,
      type: String
    }
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model('Party', partySchema);