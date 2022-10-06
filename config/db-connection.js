const mongoose = require('mongoose')
function dbConnection(){
  mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected to mongodb...'))
}

module.exports = dbConnection