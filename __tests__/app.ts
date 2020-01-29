'use strict'

import supertest from 'supertest'
import { Request, Response } from 'express'

import { server as serverTs } from '../generators/app/templates/src/app'
import { server as serverJs } from '../generators/app/templates/src/app.js'

describe('express server - GET', () => {
  test('server in app.ts should receive requests from clients', async () => {
    const response = await supertest(serverTs).get('/')
    expect(response.text).toEqual('Hello there!')
  })

  test('server in app.js should receive requests from clients', async () => {
    const response = await supertest(serverJs).get('/')
    expect(response.text).toEqual('Hello there!')
  })
})

describe('express server - POST', () => {
  const echo = (req: Request, res: Response) => res.send(req.body)

  test('server in app.ts has json middleware configured correctly', async () => {
    serverTs.post('/echo', echo)

    const data = { king: false }
    const response = await supertest(serverTs)
      .post('/echo')
      .send(data)
    expect(response.body).toEqual(data)
  })

  test('server in app.js has json middleware configured correctly', async () => {
    serverJs.post('/echo', echo)

    const data = { queen: true }
    const response = await supertest(serverJs)
      .post('/echo')
      .send(data)
    expect(response.body).toEqual(data)
  })
})
