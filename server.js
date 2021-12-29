require('dotenv').config()
const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const http = require('http')

const server = http.createServer(app).listen(port, () => console.log(`server running on port ${port}`))

const multer = require('multer') // used for file uploads

const listener = require('socket.io')(server)
listener.on('connection', (socket) => {
  console.log('something connected')

  // const log = fs.readFileSync('./log.log', { encoding:'utf8', flag:'r' })
  
  // fs.writeFileSync('./log.log', log ? `${log}\nsomething connected => ${new Date()}` : `something connected => ${new Date()}`)

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

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads')
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(`./uploads/${req.params.directory}`)) {
      fs.mkdirSync(`./uploads/${req.params.directory}`)
    }
    cb(null, `./uploads/${req.params.directory}`)
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.new_name}_${file.originalname}`)
  }
})

const upload = multer({ storage })

app.post('/rename_one/:new_name/:directory', upload.any('files'), (req, res) => {
  try {
    listener.emit('custom_refresh', { description: 'reload page on file upload' })
    res.sendStatus(200)
  } catch(err) {
    res.sendStatus(400)
  }
})

app.post('/rename_multiple/:new_name/:directory', upload.any('files'), (req, res) => {
  try {
    res.sendStatus(200)
    listener.emit('custom_refresh', { description: 'reload page on file upload' })
  } catch(err) {
    res.sendStatus(400)
  }
})