// Importing
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import Pusher from 'pusher'

import mongoPosts from './mongoPosts.js'

// App Config
const app = express()
const port = process.env.PORT || 8000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// DB Config
const mongoURI = 'mongodb+srv://admin:KsDmm1u8B2RKgKCj@cluster0.f9hlo.mongodb.net/fbdb?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('DB Connected')
})

// API Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello World Hp')
})

app.post('/upload/post', (req, res) => {
  const dbPost = req.body
  console.log(dbPost);

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
      res.status(200).send(data)
    }
  })
})

// // Listener
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

