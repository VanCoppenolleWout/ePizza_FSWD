import { User } from '@firebase/auth'
import { Address } from './address'
import { Pizza } from './pizza'
import { pizzaSizeTopping } from './pizzasizetopping'

export interface Order {
  order_id: string
  price: string
  order_date: Date
  delivery_date: Date
  delivery_cost: number

  address: Address | null
  guest?: string
  user?: User
  pizzaSizeToppings: Array<pizzaSizeTopping>
}
