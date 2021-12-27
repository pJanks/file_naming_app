// require necessary frameworks etc.
const express = require('express')
const app = express()
const multer = require('multer') // used for file uploads
const http = require('http')
const port = 3001
const fs = require('fs')

const server = http.createServer(app).listen(port, () => console.log(`server running on port ${port}`))

const listener = require('socket.io')(server)

// verify socket is connected in console and load screen data
listener.on('connection', (socket) => {
  console.log('a screen connected')

  socket.on('disconnect', () => {
    console.log('a screen disconnected')
  })
})

// gain access to css and other js files in html
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

// app.use(express.json({ limit: 100000000000 }))

app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); })

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.post('/rename', (req, res) => {
  console.log(req)
})

// 1. When the client receives a File request email, there is still a “list of suggested business categories” in the body of the email. Can we please delete it, and use it only for requests for Excel files.

// 3. Can we change the color theme of File request emails from green to blue?

// 5. On the client screen, can we update the “Browse” button to “Browse or Drag & Drop”

// 6. Is it possible to add the “Miscellaneous File” or “Additional Document” Option under the “Select Document Type” drop-down menu, in case we need to request an unspecified file from the client?

// 8. The system doesn’t allow me not to select the year, I must choose an option. Can we add “All Years” or have an entry where this field can be left blank, in case we don’t have to use this for file requests?

// 10. I’ve tried to upload & download the file and upon Zip file download, the file wouldn’t unzip. I get the “Unexpected error is keeping you from copying the file” popup window. Error 0x80004005 