import express from 'express'
import body from 'body-parser'
import cors from 'cors'
import path from 'path'

import { get, post } from './controller/QueueController'

const app = express()
app.use(cors())
app.use(body())

app.get('/api/v1/queue', get)
app.post('/api/v1/queue/new', post)

app.listen(9010)