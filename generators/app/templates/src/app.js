const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const { config } = require('dotenv')

config()

const { PORT } = process.env

const server = express()
server.use(cookieParser())
server.use(cors())
server.use(bodyParser.json())

server.get('/', (req, res) => {
  res.send('Hello there!')
})

module.exports = { server, port: PORT }
