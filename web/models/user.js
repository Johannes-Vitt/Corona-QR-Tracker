const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  mail: {
    type: String,
  },
  tel: {
    type: String,
  },
  code: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('User', userSchema)