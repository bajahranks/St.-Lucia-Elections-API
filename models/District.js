const mongoose = require('../config/db');

const districtSchema = new mongoose.Schema(
  {
    code: {
      desc: "The district's code.",
      trim: true,
      type: String,
      unique: true,
      required: true
    },
    name: {
      desc: "The district's name.",
      trim: true,
      type: String,
      index: true,
      unique: true,
      required: true
    },
    description: {
      desc: "A description of the district",
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

module.exports = mongoose.model('District', districtSchema);