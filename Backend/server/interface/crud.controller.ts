import { Router } from 'express'
import { EntityTarget, getRepository, Repository } from 'typeorm'

export class CrudController<T> implements IController {
	public repository: Repository<T>
	public router: Router = Router()

	constructor(model: EntityTarget<T>) {
		this.repository = getRepository(model)
	}
}

export interface IController {
	router: Router
}
