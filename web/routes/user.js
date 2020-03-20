const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Creating a User
router.post('/', async (req, res) => {

    mail = req.body.mail || null 
    tel = req.body.tel || null 

    if(mail == null && tel == null) {
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