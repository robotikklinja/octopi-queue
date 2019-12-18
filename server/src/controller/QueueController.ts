import { Request, Response } from 'express'
import { addRecord, getStorage, end, setStorage } from '../App'
import { QueueItem } from '../../../shared/shared'

export async function get(req: Request, res: Response) {
  const data = await getStorage()

  return end(200, data, req, res)
}

export async function post(req: Request, res: Response) {
  const record: QueueItem = req.body

  if (await addRecord(record)) {
    return end(200, {}, req, res)
  } else {
    return end(400, {}, req, res)
  }
}

export async function patch(req: Request, res: Response) {
  const data = await getStorage()

  if (data.items.length > 0) {
    data.items.shift()
  }

  setStorage(data)

  return end(200, {}, req, res)
}