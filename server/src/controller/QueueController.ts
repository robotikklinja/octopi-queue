import { Request, Response } from 'express'
import { addRecord, getStorage, end, setStorage } from '../App'
import { QueueItem } from '../App'

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
  const { id } = req.params

  const left = data.items.filter(x => x.printer === 0)
  const right = data.items.filter(x => x.printer === 1)

  if (parseInt(id) === 0) {
    left.shift()
  } else {
    right.shift()
  }

  const queue = [...left, ...right]

  setStorage({ size: queue.length, items: queue })

  return end(200, {}, req, res)
}