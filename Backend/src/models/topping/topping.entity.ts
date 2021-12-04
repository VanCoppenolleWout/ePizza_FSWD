import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderPizzaSizeTopping } from '../order_pizza/order.pizza.size.entity'
import { Pizza } from '../pizza/pizza.entity'

@Entity('Topping')
export class Topping {
  @PrimaryGeneratedColumn('uuid')
  topping_id?: string
  @Column()
  name?: string
  @Column()
  price?: number
  @Column()
  stock?: number

  @ManyToMany(() => Pizza, (pizza) => pizza.toppings)
  pizzas?: Pizza[]

  @ManyToMany(
    () => OrderPizzaSizeTopping,
    (orderPizzaSizeTopping) => orderPizzaSizeTopping.toppings,
  )
  orderPizzaSizeToppings?: OrderPizzaSizeTopping[]
}
