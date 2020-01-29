import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'

config()

const { PORT } = process.env

export const server = express()
server.use(cookieParser())
server.use(cors())
server.use(express.json())

server.get('/', (_req: express.Request, res: express.Response) => {
  res.send('Hello there!')
})

export const port = PORT
