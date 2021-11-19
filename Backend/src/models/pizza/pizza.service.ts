import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Size } from '../size/size.entity'
import { Pizza } from './pizza.entity'

@Injectable()
export class PizzaService {
  constructor(
    @Inject('PizzaRepository') private pizzaRepository: Repository<Pizza>,
    @Inject('SizeRepository') private sizeRepository: Repository<Size>,
  ) {}

  async getOne(pizza_id: string) {
    return await this.pizzaRepository.findOne(pizza_id)
  }

  async findOne(name: string) {
    return await this.pizzaRepository
      .createQueryBuilder('pizza')
      .where('pizza.name = :name', { name })
      .getOne()
  }

  async getAll() {
    return await this.pizzaRepository.find()
  }
}
