const express = require('express')
const router = express.Router()
const Hasher = require('../hasher.js')
const User = require('../models/user')
const View = require('../models/view')

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

router.get('/:code', getUser, async (req, res) => {

    var result = JSON.parse(JSON.stringify(res.user))
    result.visits = []

    var views = await View.find({userId: res.user.code},{poiId: 1, timestamp:1})

    const find_views_minutes_before_scan = 15
    const find_views_minutes_after_scan = 120

    itemsProcessed = 0

    views.forEach(async (view, index, array) => {
        var low_timestamp = new Date((view.timestamp / 60 - find_views_minutes_before_scan) * 60 * 1000)
        var high_timestamp = new Date((view.timestamp / 60 + find_views_minutes_after_scan) * 60 * 1000)
    
        try {
            var views = await View.aggregate([
                {
                    $match: { 
                        poiId: view.poiId,
                        timestamp: { $gt: (low_timestamp.getTime() / 1000).toString(), $lt: (high_timestamp.getTime() / 1000).toString()}
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: 'code',
                        as: 'person',
                    }
                }, {
                    $project: {
                        timestamp: 1,
                        "person.mail": 1,
                        "person.tel": 1,
                        "person.code": 1,
                    }
                }
            ])
    
            var visit = JSON.parse(JSON.stringify(view))
            var contacts = JSON.parse(JSON.stringify(views))
            visit.contacts = contacts
            result.visits.push(visit)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }

        itemsProcessed++
        if(itemsProcessed === array.length) {
            res.json(result)
        }
    })
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
        user = await User.findOne({code: req.params.code})
        if (user == null) {
            return res.status(404).json({ message: 'Cant find user'})
        } 
    } catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}


module.exports = router 