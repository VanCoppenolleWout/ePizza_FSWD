import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Order } from '../order/order.entity'
import { Pizza } from '../pizza/pizza.entity'
import { Size } from '../size/size.entity'
import { Exclude } from 'class-transformer'

@Entity('Order_Pizza_Size')
export class OrderPizzaSize {
  
  @PrimaryColumn('uuid')
  order_id?: string

  @PrimaryColumn('uuid')
  pizza_id?: string

  @PrimaryColumn()
  size_id?: number

  @ManyToOne(() => Order, (order) => order.pizzaSizeToppings, { primary: true })
  @JoinColumn({ name: 'order_id' })
  order?: Order

  @ManyToOne(() => Pizza, (pizza) => pizza.pizzaSizeToppings, {
    primary: true,
  })
  @JoinColumn({ name: 'pizza_id' })
  pizza?: Pizza

  @ManyToOne(() => Size, (size) => size.pizzaSizeToppings, {
    primary: true,
  })
  @JoinColumn({ name: 'size_id' })
  size?: Size
}
