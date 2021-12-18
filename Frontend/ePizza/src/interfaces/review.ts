import { Guest } from './guest'
import { User } from './user'

export interface Review {
  order_id: number
  user_id?: string
  guest_id?: string
  guest?: Guest
  user?: User
  title: string
  description: string
  stars: number
}
