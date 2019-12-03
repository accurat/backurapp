const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const { config } = require('dotenv')

config()

const { PORT } = process.env

const app = express()
app.use(cookieParser)
app.use(cors)
app.use(bodyParser)

const server = http.createServer(app)

module.exports = { server, port: PORT }
