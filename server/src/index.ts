import express from 'express'
import body from 'body-parser'
import { get, post, patch } from './controller/QueueController'

const app = express()
app.use(body())

app.get('/api/v1/queue', get)
app.post('/api/v1/queue/new', post)
app.delete('/api/v1/queue/complete', patch)

app.listen(9010)