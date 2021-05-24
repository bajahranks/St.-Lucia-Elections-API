const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {
  // Validate the data
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // Check if user is already in the database
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create new user.
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    res.send({user: user.name});
  }catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  // Validate the data
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send({error: error.details[0].message});

  // Check if user email doesn't exist
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send({error: 'Email does not exist'});

  // Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send({error: 'Invalid password'});

  // Create and assign a token
  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.TOKEN_SECRET,
    { expiresIn: 60 * 60 * 24 } // 24 hours
  );

  res.header('auth-token', token).send(token);
  //res.send('Logged In!');

});

module.exports = router;