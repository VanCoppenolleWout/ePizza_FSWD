import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderPizza } from './OrderPizza'
import { Pizza } from './Pizza'
import { User } from './User'

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

	@ManyToOne(() => OrderPizza, (orderPizza) => orderPizza.order)
	pizzaConnection?: Pizza[]
}
