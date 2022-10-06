const Joi = require('joi');

const ValidateCustomerInput = (data) => {
 const schema = Joi.object({
  name: Joi.string().required(),
  isGold: Joi.boolean().required(),
  phone: Joi.string().required()
 })
 return schema.validate(data)
}

module.exports = ValidateCustomerInput