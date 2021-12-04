import { Inject, Injectable } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { Repository } from 'typeorm'
import { Size } from '../size/size.entity'
import { Pizza } from './pizza.entity'

@Injectable()
@Resolver()
export class PizzaService {
  constructor(
    @Inject('PizzaRepository') private pizzaRepository: Repository<Pizza>,
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

  @Query(() => [Pizza])
  async getAll() {
    return await this.pizzaRepository
      .createQueryBuilder('pizza')
      .innerJoinAndSelect('pizza.toppings', 'topping')
      .getMany()
  }

  async updateStock(body: any) {
    const pizza: Pizza = await this.pizzaRepository.findOne(body.pizza_id)
    const pizza_id = pizza.pizza_id

    return await this.pizzaRepository
      .createQueryBuilder('pizza')
      .update()
      .set({
        stock: pizza.stock + body.amount,
      })
      .where('pizza_id = :pizza_id', { pizza_id })
      .execute()
  }
}
