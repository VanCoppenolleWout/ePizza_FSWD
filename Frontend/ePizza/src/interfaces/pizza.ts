import { Topping } from './topping'

export type Pizza = {
  pizza_id: string
  name: string
  size_id: number
  topping_ids: Array<string>
  price: number
  stock?: number
  img_url?: string
  img_url_nobg?: string
  vegetarian?: boolean
  toppings: Array<Topping>
  description?: string
}
