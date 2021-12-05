import { Pizza } from './pizza'
import { Topping } from './topping'
import { Size } from './size'

export interface pizzaSizeTopping {
  pizza: Pizza
  size: Size
  toppings: Array<Topping>
}
