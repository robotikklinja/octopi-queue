import { Request, Response } from 'express'
import { addRecord, getStorage, end } from '../App'
import { QueueItem } from '../../../shared/shared'

export async function get(req: Request, res: Response) {
  const data = await getStorage()

  return end(200, data, req, res)
}

export async function post(req: Request, res: Response) {
  const record: QueueItem = req.body

  console.log(record)

  if (await addRecord(record)) {
    return end(200, {}, req, res)
  } else {
    return end(400, {}, req, res)
  }
}