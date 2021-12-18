import { Address } from './address'
import { Guest } from './guest'
import { Pizza } from './pizza'
import { pizzaSizeTopping } from './pizzasizetopping'
import { Review } from './review'
import { User } from './user'

export interface Order {
  order_id: number
  price: string
  order_date: Date
  delivery_date: Date
  delivery_cost: number
  review: Review
  payment_method?: string
  delivery?: boolean
  status?: string

  address: Address | null
  guest?: Guest
  user?: User
  pizzaSizeToppings: Array<pizzaSizeTopping>
}
