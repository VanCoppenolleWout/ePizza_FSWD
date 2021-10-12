import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Pizza } from './Pizza'
import { PizzaTopping } from './PizzaTopping'

@Entity('Topping')
export class Topping {
	@PrimaryGeneratedColumn('uuid')
	topping_id?: string
	@Column()
	name?: string
	@Column()
	price?: number

	@OneToMany(() => PizzaTopping, (pizzaTopping) => pizzaTopping.topping)
	pizzaConnection?: Pizza[]
}
