const express = require('express')
const router = express.Router()
const POI = require('../models/poi')
const Hasher = require('../hasher')

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
    hash = req.body.hash

    delete req.body.hash

    if(!Hasher(req.body, hash)) {
        res.status(400).json('auth failed')
        return   
    }

    mail = req.body.mail
    tel = req.body.tel

    if(mail == undefined && tel == undefined) {
        res.status(400).json('no mail or tel provided')
        return
    }

    // TODO: get code from somewhere
    code = '1234'
        
    const poi = new POI({
        location_href: req.body.location,
        tel: tel,
        mail: mail,
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