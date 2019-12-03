const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const { config } = require('dotenv')

config()

const { PORT } = process.env

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello there!')
})

module.exports = { app, port: PORT }
