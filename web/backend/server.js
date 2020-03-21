const config = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

// mongoose promise
mongoose.Promise = Promise;

//
const timeout = ms => new Promise(res => setTimeout(res, ms));

// db connection
const connectMongoDB = async (attempt = 0) => {
  const DB_HOST = 'mongo_qrona';
  const DB_NAME = 'qrona';
  const DB_PASSWORD = 'qronapw';
  const DB_PORT = 27017;
  const DB_USER = 'qrona';
  try {
    await mongoose.connect(
      `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      {
        useNewUrlParser: true,
      },
    );
    console.info('Connected to database!!!');
  } catch (err) {
    console.error('Could not connect to MongoDB: ' + err);

    if (attempt < 10) {
      await timeout(1000 * attempt * 2);
      connectMongoDB(++attempt);
    }
  }
};

connectMongoDB()

app.use(express.json())
app.use(cors())
const userRouter = require('./routes/user')
const poiRouter = require('./routes/poi')
const viewsRouter = require('./routes/view')
app.use('/api/user', userRouter)
app.use('/api/poi', poiRouter)
app.use('/api/view', viewsRouter)
app.use('/', express.static('public'));

app.listen(3000, () => console.log('server started'))