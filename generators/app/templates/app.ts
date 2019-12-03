import http from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'

config()

const { PORT } = process.env

const app = express()
app.use(cookieParser)
app.use(cors)
app.use(bodyParser)

export const server = http.createServer(app)
export const port = PORT
