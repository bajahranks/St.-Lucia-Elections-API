const User = require("../models/User");
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * This method is to register a user.
 */
exports.register = (req, res) => {
  // Validate the data
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send({message: error.details[0].message});

  // Check if user is already in the database
  User.findOne({email: req.body.email}).then(emailExist => {
    if(emailExist) return res.status(400).send('Email already exists');
  }).catch(err => {
    res.status(500).send({ message: err.message || "An error occurred while checking if user already exist" });
  });

  // Encrypt password and save user.
  bcrypt.genSalt(10).then(salt => {
    bcrypt.hash(req.body.password, salt).then(hashPassword => {
      // create new user.
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role
      });

      // save user.
      user.save().then(results => {
        res.status(200).send({user: results});
      }).catch(err => {
        console.log('Value of password outside of promise:' + hashPassword)
        res.status(500).send({ message: error.message || "An error occurred while saving user." });
      });
    }).catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while creating hash password" });
    });
  }).catch(err => {
    res.status(500).send({ message: err.message || "An error occurred while creating salt" });
  });
}

/**
 * This method is to login a user.
 */
exports.login = (req, res) => {
  // Validate the data
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send({error: error.details[0].message});

  // Check if user email doesn't exist
  User.findOne({email: req.body.email}).then(user => {
    if(!user) {
      return res.status(400).send({error: 'Email does not exist'});
    } else {
      // Check if password is correct
      bcrypt.compare(req.body.password, user.password).then(validPassword => {
        if(!validPassword) {
          return res.status(400).send({error: 'Invalid password'});
        } else {
          // Create and assign a token
          const token = jwt.sign(
            {
              id: user._id,
              name: user.name,
              role: user.role
            },
            process.env.TOKEN_SECRET,
            { expiresIn: 60 * 60 * 24 } // 24 hours
          );
          res.header('auth-token', token).send(token);
        }
      }).catch(err => {
        res.status(500).send({ message: err.message || "An error occurred while verifying password" });
      });
    }
  }).catch(err => {
    res.status(500).send({ message: err.message || "An error occurred while verifying if email already exist" });
  });
}

/**
 * Find all users. If a filter is supplied, find the users that satisfy
 * the condition.
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  User.find(condition)
    .sort({ name: 1 }) // Alphabetical order. -1 for descending order.
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error finding user" });
    });
};

/**
 * Find one user.
 */
exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then(result => {
      !result ?
        res.status(404).send({ message: "User with id " + req.params.id + " not found" }) :
        res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving user with id " + req.params.id });
    });
};

/**
 * Update user with the specified id in the request.
 */
exports.update = (req, res) => {
  // Validate the data
  if (!req.body.name || !req.body.email || !req.body.role) {
    res.status(400).send({ message: "required field name cannot be empty" });
  }

  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      !result ?
        res.status(404).send({ message: "no users found" }) :
        res.status(200).send({ message: "Update successful" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error while updating." });
    });
};

/**
 * Delete a user with the specified id in the request.
 */
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(result => {
      !result ?
        res.status(404).send({ message: "User not found" }) :
        res.send({ message: "User deleted successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete user" });
    });
};

/**
 * Delete all users.
 */
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(result => {
      res.status(200).send({ message: `${result.deletedCount} users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete user" });
    });
};