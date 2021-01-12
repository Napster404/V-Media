// Importing
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
// import path from 'path'
// import Pusher from 'pusher'
import * as socketIo from 'socket.io'
import mongoPosts from './mongoPosts.js'

//---messenger--
import Messages from './dbMessages.js'
// App Config
const app = express()
const port = process.env.PORT || 8000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Listener
const server = app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

// Socket Setup

const io = new socketIo.Server(server, {
  cors: {
    origin: "*",
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log('User Connected')

  socket.emit('temp', {
    data: 'ABCD'
  }, 1000)

  socket.on('disconnect', () => {
    console.log('User Disconnected')
  })
})


// DB Config
const mongoURI = 'mongodb+srv://admin:KsDmm1u8B2RKgKCj@cluster0.f9hlo.mongodb.net/fbdb?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('DB Connected')

  const changeStream = mongoose.connection.collection('posts').watch()
  changeStream.on('change', (change) => {

    if (change.operationType === 'insert') {
      io.emit('refresh', {body: 'DB Changed'})
    } else {
      console.log('Error Triggering Pusher')
    }

  })

})

// API Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello World Hp')
})

app.post('/upload/post', (req, res) => {
  const dbPost = req.body;
  console.log("here "+ dbPost);
  mongoPosts.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

app.get('/retrieve/posts', (req, res) => {
  mongoPosts.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      data.sort((a, b) => { return b.timestamp - a.timestamp })
      res.send(data)
    }
  })
})
//------------ messenger-----

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body;
  console.log(dbMessage + " here chat");
  Messages.create(dbMessage, (err, data) =>{
    if(err) console.log(err);
    else
    {
      res.status(201).send(`New message created: \n ${data}`)
    }
  })
})

app.get('/messages/sync', (req, res) =>{
  Messages.find((err, data) => {
    if(err) console.log(err);
    else{
      res.status(200).send(data);
    }
  })
})
