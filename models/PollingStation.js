const mongoose = require('../config/db');

const pollingStationSchema = new mongoose.Schema({
    code: {
      desc: "The polling station's name.",
      trim: true,
      type: String,
      required: true,
    },
    name: {
      desc: "The polling station's name.",
      trim: true,
      type: String,
      required: true,
      index: true
    },
    district: {
      desc: "The district where the polling station is located.",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
      required: true
    }
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

module.exports = mongoose.model('PollingStation', pollingStationSchema);