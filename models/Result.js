const mongoose = require('../config/db');

const resultSchema = new mongoose.Schema({
    year: {
      desc: "The year the elections took place.",
      trim: true,
      type: String,
      required: true,
      index: true
    },
    district: {
      desc: "The result is for which district?",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
      required: true
    },
    pollingStation: {
      desc: "The result is for which polling station?",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PollingStation',
      required: true
    },
    section: {
      desc: "The result is for which section?",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: true
    },
    candidate1: {
      desc: "The first candidate",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true
    },
    /*candidate1Party: {
      desc: "The party affiliation of candidate 1?",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party',
      required: true
    },*/
    candidate1Votes: {
      desc: "The votes for the first candidate",
      trim: true,
      type: Number,
      required: true
    },
    candidate2: {
      desc: "The second candidate",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true
    },
    /*candidate2Party: {
      desc: "The party affiliation of candidate 2?",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party',
      required: true
    },*/
    candidate2Votes: {
      desc: "The votes for the second candidate",
      trim: true,
      type: Number,
      required: true
    },
    candidate3: {
      desc: "The third candidate",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    },
    /*candidate3Party: {
      desc: "The party affiliation of candidate 3?",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party'
    },*/
    candidate3Votes: {
      desc: "The votes for the third candidate",
      trim: true,
      type: Number
    },
    candidate4: {
      desc: "The fourth candidate",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    },
    /*candidate4Party: {
      desc: "The party affiliation of candidate 4?",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party'
    },*/
    candidate4Votes: {
      desc: "The votes for the fourth candidate",
      trim: true,
      type: Number
    },
    candidate5: {
      desc: "The fifth candidate",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    },
    /*candidate5Party: {
      desc: "The party affiliation of candidate 5?",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party'
    },*/
    candidate5Votes: {
      desc: "The votes for the fifth candidate",
      trim: true,
      type: Number
    },
    candidate6: {
      desc: "The sixth candidate",
      trim: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    },
    candidate6Votes: {
      desc: "The votes for the sixth candidate",
      trim: true,
      type: Number
    },
    registeredVoters: {
      desc: "The number of registered voters",
      trim: true,
      type: Number
    },
    votesCast: {
      desc: "The number of votes casted",
      trim: true,
      type: Number
    },
    rejectedVotes: {
      desc: "The number of votes rejected",
      trim: true,
      type: Number
    },
    comments: {
      desc: "Information about the results",
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

module.exports = mongoose.model('Result', resultSchema);