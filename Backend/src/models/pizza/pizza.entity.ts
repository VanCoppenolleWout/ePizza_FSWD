import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from '../order/order.entity'
import { OrderPizza } from '../orderpizza/orderpizza.entity'
import { PizzaSize } from '../pizzasize/pizzasize.entity'
import { PizzaTopping } from '../pizzatopping/pizzatopping.entity'
import { Size } from '../size/size.entity'
import { Topping } from '../topping/topping.entity'

@Entity('Pizza')
export class Pizza {
  @PrimaryGeneratedColumn('uuid')
  pizza_id?: string
  @Column()
  name?: string
  @Column()
  description?: string
  @Column()
  stock?: number
  @Column()
  price?: number
  @Column()
  img_url?: string

  @OneToMany(() => OrderPizza, (orderPizza) => orderPizza.pizza)
  orderConnection?: Order[]
  @OneToMany(() => PizzaTopping, (pizzaTopping) => pizzaTopping.pizza)
  toppingConnection?: Topping[]
  @OneToMany(() => PizzaSize, (pizzaSize) => pizzaSize.pizza)
  sizeConnection?: Size[]
}
