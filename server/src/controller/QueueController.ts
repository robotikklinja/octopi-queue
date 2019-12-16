import { Request, Response } from 'express'

export function get(req: Request, res: Response) {
  res.json({ status: 200}).status(200)
}

export function post(req: Request, res: Response) {
  res.json({ status: 404 }).status(404)
}