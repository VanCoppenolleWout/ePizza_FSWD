import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Topping } from './topping.entity'

@Injectable()
export class ToppingService {
  constructor(
    @Inject('ToppingRepository') private toppingRepository: Repository<Topping>,
  ) {}

  async getAll() {
    return await this.toppingRepository.find()
  }

  async getAllWithPizzas(pizza_id: string) {
    return await this.toppingRepository
      .createQueryBuilder('topping')
      .leftJoinAndSelect('topping.pizzas', 'pizza')
      .where('pizza.pizza_id = :pizza_id', { pizza_id })
      .getMany()
  }

  async getOne(topping_id: string) {
    return await this.toppingRepository.findOne(topping_id)
  }

  async updateStock(body: any): Promise<any> {
    const topping: Topping = await this.toppingRepository.findOne(
      body.topping_id,
    )
    const topping_id = topping.topping_id

    return await this.toppingRepository
      .createQueryBuilder('topping')
      .update()
      .set({
        stock: topping.stock + body.amount,
      })
      .where('topping_id = :topping_id', { topping_id })
      .execute()
  }

  async updateStockMultiple(body: any): Promise<any> {
    const topping_ids = body.topping_ids

    const toppings: Topping[] = await this.toppingRepository
      .createQueryBuilder('topping')
      .where('topping_id IN (:topping_ids)', { topping_ids })
      .getMany()

    const toppingsUpdated: Topping[] = toppings.map((topping, index) => {
      console.log(topping)
      topping.stock = topping.stock + body.amounts[index]
      return topping
    })

    return await this.toppingRepository.save(toppingsUpdated)
  }
}
