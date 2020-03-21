const express = require('express')
const router = express.Router()
const POI = require('../models/poi')
const Hasher = require('../hasher')

function randomString(length, chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// Getting all pois
router.get('/', async (req, res) => {
    try {
      const pois = await POI.find({})
      res.json(pois)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// Creating a POI
router.post('/', async (req, res) => {

    mail = req.body.mail

    code = '1234'

    while(true) {
        possibleCode = randomString(6)
        const pois = await POI.find({code: possibleCode})

        if(pois.length == 0) {
            code = possibleCode
            break
        }
    }
        
    const poi = new POI({
        location_href: req.body.location,
        mailTel: mail,
        title: req.body.title,
        category: req.body.category,
        code: code,
    })

    try {
        const newPOI = await poi.save()
        res.status(201).json(newPOI)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router 