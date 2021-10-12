import express, { Request, Response } from 'express'
import {
	Connection,
	ConnectionOptions,
	createConnection,
	getConnectionOptions,
} from 'typeorm'
import { createDatabase } from 'typeorm-extension'
import { Pizza } from './entity/Pizza'
import { Topping } from './entity/Topping'
import { User } from './entity/User'
import { seedUser } from './seeder/seederUser'
import { seedPizza } from './seeder/seedPizza'
import { seedTopping } from './seeder/seedTopping'

const port = 3001

;(async () => {
	const connectionOptions: ConnectionOptions = await getConnectionOptions()
	createDatabase({ ifNotExist: true }, connectionOptions)
		.then(() => console.log('Database created'))
		.then(createConnection)
		.then(async (connection: Connection) => {
			let seeded = await connection.getRepository(User).find()
			seeded.length > 0 ? null : seedUser(connection)
			seeded = await connection.getRepository(Pizza).find()
			seeded.length > 0 ? null : seedPizza(connection)
			seeded = await connection.getRepository(Topping).find()
			seeded.length > 0 ? null : seedTopping(connection)
		})
		.then(async () => {
			const app = express()
			app.get('/', (request: Request, response: Response) =>
				response.send('Hello World')
			)

			app.listen(port, () =>
				console.info(`👾\nServer listening on: http://localhost:${port}`)
			)
		})
})()
