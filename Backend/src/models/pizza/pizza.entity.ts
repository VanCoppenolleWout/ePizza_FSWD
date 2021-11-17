import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderPizzaSize } from '../order_pizza/order.pizza.size.entity'

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

  @OneToMany(() => OrderPizzaSize, (orders) => orders.pizza)
  pizzaSizeToppings?: OrderPizzaSize[]
}
