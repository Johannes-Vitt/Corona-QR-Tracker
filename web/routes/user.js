const express = require('express')
const router = express.Router()
const Hasher = require('../hasher.js')
const User = require('../models/user')

// Getting all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find({})
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// Creating a User
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
        
    const user = new User({
        mail: mail,
        tel: tel,
        code: code
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router 