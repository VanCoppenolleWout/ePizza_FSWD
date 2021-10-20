import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from '../order/order.entity'
import { OrderPizza } from '../orderpizza/orderpizza.entity'
import { PizzaTopping } from '../pizzatopping/pizzatopping.entity'
import { Topping } from '../topping/topping.entity'

@Entity('Pizza')
export class Pizza {
  @PrimaryGeneratedColumn('uuid')
  pizza_id?: string
  @Column()
  name?: string
  @Column()
  amount: number
  @Column()
  price?: number

  @OneToMany(() => OrderPizza, (orderPizza) => orderPizza.pizza)
  orderConnection?: Order[]

  @OneToMany(() => PizzaTopping, (pizzaTopping) => pizzaTopping.pizza)
  toppingConnection?: Topping[]
}
