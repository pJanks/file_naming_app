const express = require('express')
const multer = require('multer') // used for file uploads
const http = require('http')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3001

const server = http.createServer(app).listen(port, () => console.log(`server running on port ${port}`))

const listener = require('socket.io')(server)

// verify socket is connected in console and load screen data
listener.on('connection', (socket) => {
  console.log('something connected')

  const log = fs.readFileSync('./log.log', { encoding:'utf8', flag:'r' })
  
  fs.writeFileSync('./log.log', log ? `${log}\nsomething connected => ${new Date()}` : `something connected => ${new Date()}`)

  socket.on('disconnect', () => {
    console.log('something disconnected')
  })
})

// const someString = 'hello world'
// let x = ''

// const iterator = someString[Symbol.iterator]()

// while (!x.done) {
//   x = iterator.next()
//   !x.done ? console.log(x) : null
// }

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); })

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.post('/rename', (req, res) => {
  
  console.log(req.body)
})