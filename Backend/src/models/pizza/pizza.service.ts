import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Pizza } from './pizza.entity'

@Injectable()
export class PizzaService {
  constructor(
    @Inject('PizzaRepository') private pizzaRepository: Repository<Pizza>,
  ) {}

  async getAll() {
    const pizzas = await this.pizzaRepository.find()

    return pizzas
  }

  async getAllWithSizes() {
    const pizzas = await this.pizzaRepository
      .createQueryBuilder('pizza')
      .innerJoinAndSelect('pizza.sizes', 'size')
      .getMany()

    return pizzas
  }

  async getAllWithToppings() {
    const pizzas = await this.pizzaRepository
      .createQueryBuilder('pizza')
      .innerJoinAndSelect('pizza.sizes', 'size')
      .getMany()

    return pizzas
  }
}
