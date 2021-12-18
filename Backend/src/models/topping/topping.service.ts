import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { Repository, UpdateResult } from 'typeorm'
import { Topping } from './topping.entity'

@Injectable()
@Resolver()
export class ToppingService {
  constructor(
    @Inject('ToppingRepository') private toppingRepository: Repository<Topping>,
  ) {}

  @Query(() => [Topping])
  async getAll() {
    return await this.toppingRepository.find()
  }

  async getAllWithPizzas(pizza_id: string) {
    if (!pizza_id)
      throw new HttpException(
        'Please provide a pizza id',
        HttpStatus.BAD_REQUEST,
      )
    const topping: Array<Topping> = await this.toppingRepository
      .createQueryBuilder('topping')
      .leftJoinAndSelect('topping.pizzas', 'pizza')
      .where('pizza.pizza_id = :pizza_id', { pizza_id })
      .getMany()

    if (topping.length <= 0)
      throw new HttpException(
        `Oops, we couldn't find any topping with that pizza id`,
        HttpStatus.BAD_REQUEST,
      )
  }

  async getOne(topping_id: string) {
    if (!topping_id)
      throw new HttpException(
        'Some fields are not filled in correctly',
        HttpStatus.BAD_REQUEST,
      )
    return await this.toppingRepository.findOne(topping_id)
  }

  async updateStock(body: any): Promise<UpdateResult> {
    const { topping_id, amount, price } = body
    if (!topping_id || !amount || typeof amount !== 'number' || !price)
      throw new HttpException(
        'Some fields are not filled in correctly',
        HttpStatus.BAD_REQUEST,
      )

    const topping: Topping = await this.toppingRepository.findOne(topping_id)
    if (!topping)
      throw new HttpException(
        `We couldn't find that topping ..`,
        HttpStatus.BAD_REQUEST,
      )

    return await this.toppingRepository
      .createQueryBuilder('topping')
      .update()
      .set({
        stock: amount,
        price: price,
      })
      .where('topping_id = :topping_id', { topping_id })
      .execute()
  }

  async updateStockMultiple(body: any): Promise<Array<Topping>> {
    const { topping_ids, amounts } = body
    if (
      !topping_ids ||
      topping_ids.length <= 0 ||
      !amounts ||
      amounts.length <= 0
    )
      throw new HttpException('Please provide toppings', HttpStatus.BAD_REQUEST)

    const toppings: Topping[] = await this.toppingRepository
      .createQueryBuilder('topping')
      .where('topping_id IN (:topping_ids)', { topping_ids })
      .getMany()

    if (toppings.length <= 0)
      throw new HttpException(
        `We couldn't find any toppings, did you provide the right topping ids ?`,
        HttpStatus.BAD_REQUEST,
      )

    let toppingsUpdated: Topping[] = toppings.map((topping, index) => {
      topping.stock = amounts[index]
      return topping
    })

    return await this.toppingRepository.save(toppingsUpdated)
  }

  async updateStockPrice(body: Topping): Promise<UpdateResult> {
    const { topping_id, price } = body

    if (!topping_id || !price || typeof price !== 'number')
      throw new HttpException(
        'Oops not all fields are filled in correctly',
        HttpStatus.BAD_REQUEST,
      )

    const topping: Topping = await this.toppingRepository.findOne(topping_id)
    if (!topping)
      if (!topping_id || !price)
        throw new HttpException(
          `We couldn't find that topping ..`,
          HttpStatus.BAD_REQUEST,
        )

    return await this.toppingRepository
      .createQueryBuilder('topping')
      .update()
      .set({
        price: price,
      })
      .where('topping_id = :topping_id', { topping_id })
      .execute()
  }
}
