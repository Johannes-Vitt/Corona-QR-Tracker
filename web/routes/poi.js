const express = require('express')
const router = express.Router()
const POI = require('../models/poi')

// Creating a POI
router.post('/', async (req, res) => {

    mail = req.body.mail || null 
    tel = req.body.tel || null 

    if(mail == null && tel == null) {
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