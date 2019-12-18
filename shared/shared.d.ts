export type Purpose = 'School' | 'Personal'
export interface QueueItem {
  author: string
  purpose: Purpose
  description: string
  estimated: number
}

export interface Queue {
  size: number
  items: Array<QueueItem>
}