const Joi = require("joi");

const authSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

module.exports = {
  authSchema,
};
