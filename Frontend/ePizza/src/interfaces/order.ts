import { User } from '@firebase/auth'
import { Address } from './address'
import { Guest } from './guest'
import { Pizza } from './pizza'
import { pizzaSizeTopping } from './pizzasizetopping'
import { Review } from './review'

export interface Order {
  order_id: string
  price: string
  order_date: Date
  delivery_date: Date
  delivery_cost: number
  review: Review

  address: Address | null
  guest?: Guest
  user?: User
  pizzaSizeToppings: Array<pizzaSizeTopping>
}
