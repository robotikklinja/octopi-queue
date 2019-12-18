import path from 'path'
import { Request, Response } from 'express'
import fs from 'fs-extra'
import { Queue, QueueItem } from '../../shared/shared'

export const STORAGE_PATH = path.join(__dirname, '../storage')

export function end(status: number, json: object, request: Request, response: Response) {
  console.log(`HTTP ${request.method} | path: ${request.path} | yielded: ${status}`)

  return response.status(status).json(json)
}

export async function getStorage(): Promise<Queue> {
  const data = await fs.readFile(path.join(STORAGE_PATH, 'store.json'), 'utf8')

  return JSON.parse(data)
}

export function validateRecord(record: object): boolean {
  return record.hasOwnProperty('author')
    && record.hasOwnProperty('purpose')
    && record.hasOwnProperty('description')
    && record.hasOwnProperty('estimated')
}

export async function addRecord(record: QueueItem): Promise<boolean> {
  if (validateRecord(record)) {

    const data = await getStorage()
    data.items.push(record)

    await fs.writeFile(path.join(STORAGE_PATH, 'store.json'), JSON.stringify(data))

    return true
  }

  return false
}

export async function setStorage(storage: Queue) {
  await fs.writeFile(path.join(STORAGE_PATH, 'store.json'), JSON.stringify(storage))
}