import { plainToClass } from 'class-transformer'
import { Connection } from 'typeorm'
import { Topping } from '../entity/Topping'
import topping from './data/topping.json'

export const seedTopping = async (connection: Connection) => {
	const toppingOrm = plainToClass(Topping, topping)
	await connection.manager.save(toppingOrm)
}
