import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderPizzaSize } from '../order_pizza/order.pizza.size.entity'
// import { OrderPizzaSizeTopping } from '../orderpizzasizetopping/OrderPizzaSizeTopping'
import { Pizza } from '../pizza/pizza.entity'

@Entity('Size')
export class Size {
  @PrimaryGeneratedColumn('increment')
  size_id?: number
  @Column()
  size_name?: string
  @Column()
  price?: number

  // @ManyToMany(() => Pizza, (pizza) => pizza.sizes)
  // pizzas?: Pizza[]

  @OneToMany(() => OrderPizzaSize, (order) => order.size)
  pizzaSizeToppings?: OrderPizzaSize[]
}
