const mongoose = require('../config/db');
//const passport = require('passport');
//const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: {
      desc: "The user name",
      trim: true,
      type: String,
      required: true,
    },
    email: {
      desc: "The user email",
      type: String,
      required: true,
      unique: true,
      index: true,
      max: 255,
      min: 6
    },
    password: {
      desc: "The user encrypted password",
      trim: true,
      type: String,
      required: true
    },
    role: {
      desc: "The user's role",
      trim: true,
      type: String,
      enum: ["Admin", "Staff", "Poll Worker"],
      default: "Admin"
    }
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

/*userSchema.plugin(passportLocalMongoose);

passport.use(userSchema.createStrategy());

passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());*/

module.exports = mongoose.model('User', userSchema);