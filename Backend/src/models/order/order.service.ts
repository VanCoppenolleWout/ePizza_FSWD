import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Pizza } from '../pizza/pizza.entity'
import { User } from '../user/user.entity'
import { Order } from './order.entity'
import pizzasjson from '../../database/data/pizza.json'
import users from '../../database/data/user.json'
import { OrderPizzaSize } from '../order_pizza/order.pizza.size.entity'

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository') private orderRepository: Repository<Order>,
    @Inject('OrderPizzaSizeRepository')
    private orderPizzaSizeRepository: Repository<OrderPizzaSize>,
  ) {}

  async placeOrder() {
    const order: Order = new Order()

    let user: User = new User()
    user.user_id = '59b1d72f-e34c-482e-ac5f-8e67fb5c7f5a'

    let pizzas: Pizza[] = new Array<Pizza>()
    let pizza: Pizza = pizzasjson[0]
    pizzas.push(pizza)
    pizzas.push(pizzasjson[1])

    order.user = user
    order.delivery_cost = 10
    order.delivery_date = new Date()
    order.order_date = new Date()
    order.price = 10

    // order.pizzas = pizzas

    const res = await this.orderRepository.save(order)

    let orderPizzaSize: OrderPizzaSize[] = pizzas.map((pizza) => ({
      pizza_id: pizza.pizza_id,
      order_id: res.order_id,
      size_id: 1,
    }))

    let order_id = res.order_id
    await this.orderPizzaSizeRepository.save(orderPizzaSize)

    return await this.orderRepository
      .createQueryBuilder('order')
      .select('order.order_id')
      .addSelect(['user.user_id', 'user.name', 'user.lastname'])
      .innerJoin('order.user', 'user')
      .addSelect('pizzaSizeTopping.order_id')
      .innerJoin('order.pizzaSizeToppings', 'pizzaSizeTopping')
      .innerJoinAndSelect('pizzaSizeTopping.pizza', 'pizza')
      .addSelect(['size.size_name', 'size.price'])
      .innerJoin('pizzaSizeTopping.size', 'size')

      .where('order.order_id = :order_id', { order_id })
      .getOne()
  }

  async getAll() {
    // return await this.orderRepository.find({
    //   relations:['pizzas', 'user', 'sizes']
    // })
    return this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.pizzas', 'pizzas')
      .innerJoinAndSelect('pizzas.sizes', 'sizes')
      .getMany()
  }
}
