import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderPizza } from '../orderpizza/orderpizza.entity'
import { Pizza } from '../pizza/pizza.entity'
import { User } from '../user/user.entity'

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn()
  order_id?: string
  @Column()
  price?: number
  @Column()
  order_date?: Date
  @Column()
  delivery_date?: Date
  @Column()
  delivery_cost?: number

  @ManyToOne(() => User, (user) => user.orderConnection)
  @JoinColumn({ name: 'user_id' })
  userConnection?: User

  @OneToMany(() => OrderPizza, (orderPizza) => orderPizza.order)
  pizzaConnection?: Pizza[]
}
