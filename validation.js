// validation
const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(5).required(),
    role: Joi.string()
  });

  return schema.validate(data);
}

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(5).required()
  });

  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;