const express = require('express');
const router = express.Router();
const verify = require('../verifyToken');
const User = require('../models/User');

router.get('/', verify, (req, res, next) => {
  res.send({user: req.user, message: 'successfully entered the test site'});
  //User.findById({_id: req.user});
});

module.exports = router;