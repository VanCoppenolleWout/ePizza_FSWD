import { plainToClass } from 'class-transformer'
import { Connection } from 'typeorm'
import { Pizza } from '../entity/Pizza'
import pizza from './data/pizza.json'

export const seedPizza = async (connection: Connection) => {
	const pizzaOrm = plainToClass(Pizza, pizza)
	await connection.manager.save(pizzaOrm)
}
