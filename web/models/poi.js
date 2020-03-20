const mongoose = require('mongoose')

const poiSchema = new mongoose.Schema({
  location_href: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
  },
  tel: {
    type: String,
  },
  category: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('POI', poiSchema)