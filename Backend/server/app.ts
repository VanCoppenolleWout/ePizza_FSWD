import express, { Request, Response } from 'express'
import {
	ConnectionOptions,
	createConnection,
	getConnectionOptions,
} from 'typeorm'
import { createDatabase } from 'typeorm-extension'

const port = 3001

;(async () => {
	const connectionOptions: ConnectionOptions = await getConnectionOptions()
	createDatabase({ ifNotExist: true }, connectionOptions)
	.then(() => console.log('Database created'))
	.then(createConnection)
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
