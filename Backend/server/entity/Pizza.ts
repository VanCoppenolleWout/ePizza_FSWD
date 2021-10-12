import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './Order'
import { OrderPizza } from './OrderPizza'
import { PizzaTopping } from './PizzaTopping'
import { Topping } from './Topping'

@Entity('Pizza')
export class Pizza {
	@PrimaryGeneratedColumn('uuid')
	pizza_id?: string
	@Column()
	name?: string
	@Column()
	price?: number

	@OneToMany(() => OrderPizza, (orderPizza) => orderPizza.pizza)
	orderConnection?: Order[]

	@OneToMany(() => PizzaTopping, (pizzaTopping) => pizzaTopping.pizza)
	toppingConnection?: Topping[]
}
