const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200,
    minLength: 3
  },
  isGold: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: String,
    maxLength: 12,
    minLength: 10,
    required: true,
  }
});

const cutomerModel =  mongoose.model('customer', CustomerSchema)

module.exports = cutomerModel