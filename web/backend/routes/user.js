const express = require('express')
const router = express.Router()
const Hasher = require('../hasher.js')
const User = require('../models/user')

function randomString(length, chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// Getting all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find({})
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

router.get('/:code', getUser, (req, res) => {
    res.json(res.user)
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

    code = '1234'

    while(true) {
        possibleCode = randomString(6)
        const users = await User.find({code: possibleCode})

        if(users.length == 0) {
            code = possibleCode
            break
        }
    }

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

async function getUser(req, res, next) {
    try {
      console.log("hi")
      console.log(req.params.code)
      var user = await User.findOne()
      if (user == null) {
        console.log("nullll")
        return res.status(404).json({ message: 'Cant find user'})
      }
    } catch(err){
        console.log("catch")
      return res.status(500).json({ message: err.message })
    }
}


module.exports = router 