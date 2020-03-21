const express = require('express')
const router = express.Router()
const View = require('../models/view')
const Hasher = require('../hasher')

// Getting all views
router.get('/', async (req, res) => {
    try {
      const views = await View.find({})
      res.json(views)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// Creating a View
router.post('/', async (req, res) => {
    hash = req.body.hash

    delete req.body.hash

    if(!Hasher(req.body, hash)) {
        res.status(400).json('auth failed')
        return   
    }

    const view = new View({
        userId: req.body.uid,
        poiId: req.body.pid,
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