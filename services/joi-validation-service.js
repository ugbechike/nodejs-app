const Joi = require('Joi');


const validateInputService = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    tags: Joi.required()
  });
  return schema.validate(data);
}

module.exports = validateInputService