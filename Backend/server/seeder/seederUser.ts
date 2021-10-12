import { plainToClass } from 'class-transformer'
import { Connection } from 'typeorm'
import { User } from '../entity/User'
import user from './data/user.json'

export const seedUser = async (connection: Connection) => {
	const userOrm = plainToClass(User, user)
	await connection.manager.save(userOrm)
}
