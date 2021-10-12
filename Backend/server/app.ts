import express, { Request, Response } from 'express'

const app = express(),
	port = 3001

app.get('/', (request: Request, response: Response) => {
	response.send('Hello World')
})

app.listen(port, () => console.info(`Listening on: http://localhost:${port}`))
