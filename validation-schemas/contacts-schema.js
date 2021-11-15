const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
    .required(),
  favorite: Joi.boolean(),
});

const joiSchemaUpd = Joi.object({
  name: Joi.string().alphanum().optional(),
  email: Joi.string().optional(),
  phone: Joi.string()
    .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
    .optional(),
  favorite: Joi.boolean().required(),
});

module.exports = {
  joiSchema,
  joiSchemaUpd,
};
