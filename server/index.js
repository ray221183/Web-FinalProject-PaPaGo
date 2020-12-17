require('dotenv').config()

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const WebSocket = require('ws')

const Message = require('./models/message')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

console.log(process.env.MONGO_URL)

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
  console.log("error")
})

db.once('open', () => {
  console.log('MongoDB connected!')

  wss.on('connection', ws => {
    const sendData = (data) => {
      console.log(data)
      ws.send(JSON.stringify(data))
    }

    const sendStatus = (s) => {
      sendData(['status', s])
    }

    Message.find()
      .limit(100)
      .sort({ _id: 1 })
      .exec((err, res) => {
        if (err) throw err

        // initialize app with existing messages
        sendData(['init', res])
      })

    ws.onmessage = (message) => {
      const { data } = message
      console.log("data: ", data)
      const [task, payload] = JSON.parse(data)
      console.log("task: ", task)
      console.log("payload: ", payload)

      switch (task) {
        case 'input': {
          // TODO
          console.log("input")
          let msg = new Message(payload);
          msg.save((err) => console.log(err))
          sendData(["output", [payload]])
          break
        }
        case 'clear': {
          console.log("clear")
          Message.deleteMany({}, () => {
            sendData(['cleared'])
            sendStatus({
              type: 'info',
              msg: 'Message cache cleared.'
            })
          })

          break
        }
        default:
          console.log("default")
          break
      }
    }
  })

  const PORT = process.env.port || 4000

  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
})
