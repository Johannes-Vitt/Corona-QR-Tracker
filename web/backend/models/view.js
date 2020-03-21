const mongoose = require('mongoose')

const viewSchema = new mongoose.Schema({
  timestamp: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  poiId: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('View', viewSchema)