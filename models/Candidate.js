const mongoose = require('../config/db');

const candidateSchema = new mongoose.Schema({
    name: {
      desc: "The candidate's name.",
      trim: true,
      type: String,
      required: true,
      unique: true,
      index: true
    },
    dob: {
      desc: "The candidates's date of birth.",
      trim: true,
      type: Date
    },
    gender: {
      desc: "candidate gender.",
      trim: true,
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Others"
    },
    party: {
      desc: "The party the candidate represents.",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party',
      required: true
    },
    district: {
      desc: "The district the candidate represents.",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
      required: true
    },
    comments: {
      desc: "Other information about the candidate.",
      trim: true,
      type: String,
    }
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

module.exports = mongoose.model('Candidate', candidateSchema);