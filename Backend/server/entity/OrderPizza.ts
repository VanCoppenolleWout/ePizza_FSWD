import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Order } from './Order'
import { Pizza } from './Pizza'

@Entity('Order_Pizza')
export class OrderPizza {
	@PrimaryColumn('uuid')
	user_id?: string
	@PrimaryColumn('uuid')
	order_id?: string

	@ManyToOne(() => Order, (order) => order.pizzaConnection)
	@JoinColumn({ name: 'order_id' })
	order?: Order

	@ManyToOne(() => Pizza, (pizza) => pizza.orderConnection)
	@JoinColumn({ name: 'pizza_id' })
	pizza?: Pizza
}
