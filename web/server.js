require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}

mongoose.connect(process.env.DATABASE_URL, options)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const userRouter = require('./routes/user')
const poiRouter = require('./routes/poi')
const viewsRouter = require('./routes/view')
app.use('/user', userRouter)
app.use('/poi', poiRouter)
app.use('/view', viewsRouter)

app.listen(3000, () => console.log('server started'))