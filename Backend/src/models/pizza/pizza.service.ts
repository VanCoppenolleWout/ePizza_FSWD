import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Pizza } from './pizza.entity'

@Injectable()
export class PizzaService {
  constructor(
    @Inject('PizzaRepository') private pizzaRepository: Repository<Pizza>,
  ) {}

  async getOne(pizza_id: string): Promise<Pizza> {
    if (!pizza_id)
      throw new HttpException(
        'Please provide a pizza id',
        HttpStatus.BAD_REQUEST,
      )
    const pizza = await this.pizzaRepository.findOne(pizza_id)
    if (!pizza)
      throw new HttpException('No pizza found', HttpStatus.BAD_REQUEST)

    return pizza
  }

  async getAll(): Promise<Array<Pizza>> {
    return await this.pizzaRepository
      .createQueryBuilder('pizza')
      .leftJoinAndSelect('pizza.toppings', 'topping')
      .getMany()
  }
}
