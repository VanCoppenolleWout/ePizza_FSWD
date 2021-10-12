import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Pizza } from './Pizza'
import { Topping } from './Topping'

@Entity('Pizza_Topping')
export class PizzaTopping {
	@PrimaryColumn('uuid')
	pizza_id?: string
	@PrimaryColumn('uuid')
	topping_id?: string

	@ManyToOne(() => Pizza, (pizza) => pizza.toppingConnection, { primary: true })
	@JoinColumn({ name: 'pizza_id' })
	pizza?: Pizza

	@ManyToOne(() => Topping, (topping) => topping.pizzaConnection, {
		primary: true,
	})
	@JoinColumn({ name: 'topping_id' })
	topping?: Topping
}
