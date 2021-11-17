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

  async getOneWithSizes(pizza_id: string) {
    const pizzas = await this.pizzaRepository.findOne(pizza_id)
    const sizes = await this.sizeRepository.find()

    const obj = {
      pizza: pizzas,
      sizes: sizes,
    }
    return obj
  }

  async getAllWithSizes() {
    const pizzas = await this.pizzaRepository.find()
    const sizes = await this.sizeRepository.find()

    const obj = {
      pizzas: pizzas,
      sizes: sizes,
    }
    return obj
  }
}
