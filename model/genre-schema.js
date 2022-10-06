const mongoose = require('mongoose');

//schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 225,
    minLength: 3
  },
  tags: {
    type: Array,
    validate: {
      validator: (validate) => {
        return validate && validate.length > 0;
      },
      message: 'Genre must have atleast one tag'
    }
  },
  createdAt: {type: Date, default: Date.now()},
});

//model
const GenreModel = mongoose.model('genre', genreSchema);

module.exports = GenreModel