const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
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