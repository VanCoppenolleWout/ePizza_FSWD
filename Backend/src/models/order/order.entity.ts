import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Address } from '../address/address.entity'
import { Guest } from '../guest/guest.entity'
import { OrderPizzaSizeTopping } from '../order_pizza/order.pizza.size.entity'
import { User } from '../user/user.entity'

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id?: string
  @Column()
  price?: number
  @Column()
  order_date?: Date
  @Column()
  delivery_date?: Date
  @Column()
  delivery_cost?: number
  @Column()
  delivery?: boolean

  @ManyToOne(() => User, (user) => user.orderConnection)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @ManyToOne(() => Guest, (guest) => guest.orderConnection)
  @JoinColumn({ name: 'guest_id' })
  guest?: Guest

  @ManyToOne(() => Address, (address) => address.orderConnection)
  @JoinColumn({ name: 'address_id' })
  address?: Address

  @OneToMany(() => OrderPizzaSizeTopping, (orders) => orders.order)
  pizzaSizeToppings?: OrderPizzaSizeTopping[]
}
