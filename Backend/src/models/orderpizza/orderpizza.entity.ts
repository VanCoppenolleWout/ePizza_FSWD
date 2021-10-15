import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Order } from '../order/order.entity'
import { Pizza } from '../pizza/pizza.entity'

@Entity('Order_Pizza')
export class OrderPizza {
  @PrimaryColumn('uuid')
  pizza_id?: string
  @PrimaryColumn('uuid')
  order_id?: string

  @ManyToOne(() => Pizza, (pizza) => pizza.orderConnection, { primary: true })
  @JoinColumn({ name: 'pizza_id' })
  pizza?: Pizza

  @ManyToOne(() => Order, (order) => order.pizzaConnection, { primary: true })
  @JoinColumn({ name: 'order_id' })
  order?: Order
}
