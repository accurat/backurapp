import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'

config()

const { PORT } = process.env

export const server = express()
server.use(cookieParser())
server.use(cors())
server.use(bodyParser.json())

server.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello there!')
})

export const port = PORT
