const express = require('express')
const router = express.Router()
const View = require('../models/view')

// Creating a View
router.post('/', async (req, res) => {

    const view = new View({
        user_id: mail,
        poi_id: tel,
        timestamp: Date.now()
    })

    try {
        const newView = await view.save()
        res.status(201).json(newView)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router 