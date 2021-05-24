// validation
const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().enum(["Admin", "Staff", "Poll Worker"])
  });

  return schema.validate(data);
}

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;