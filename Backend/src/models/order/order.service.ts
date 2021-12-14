import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Pizza } from '../pizza/pizza.entity'
import { User } from '../user/user.entity'
import { Order } from './order.entity'
import { OrderPizzaSizeTopping } from '../order_pizza/order.pizza.size.entity'
import { OrderORM, UserORM } from './order.orm'
import { Topping } from '../topping/topping.entity'
import { getAuth } from 'firebase-admin/auth'
import { Address } from '../address/address.entity'
import { Guest } from '../guest/guest.entity'
import crypto from 'crypto'

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository') private orderRepository: Repository<Order>,
    @Inject('OrderPizzaSizeRepository')
    private orderPizzaSizeRepository: Repository<OrderPizzaSizeTopping>,
    @Inject('PizzaRepository')
    private pizzaRepository: Repository<Pizza>,
    @Inject('UserRepository')
    private userRepository: Repository<User>,
    @Inject('AddressRepository')
    private addressRepository: Repository<Address>,
    @Inject('GuestRepository')
    private guestRepository: Repository<Guest>,
    @Inject('ToppingRepository') private toppingRepository: Repository<Topping>,
  ) {}

  async placeOrder(orderORM: OrderORM): Promise<Order> {
    //Get the user from request
    let user: User
    let guest: Guest
    //If user signed in get user_id
    if (typeof orderORM.user === 'string') user = { user_id: orderORM.user }
    //If guest save in guest table
    if (typeof orderORM.user === 'object') {
      guest = {
        name: orderORM.user.name,
        lastname: orderORM.user.lastname,
        email: orderORM.user.email,
      }
      guest = await this.guestRepository.save(guest)
    }

    //Get pizzaIds from request
    const pizzaIds = orderORM.pizzas.map((pizza) => pizza.pizza_id)

    //Get pizzas from db to calculate the price and add to order
    const pizzas = await this.pizzaRepository
      .createQueryBuilder('pizza')
      .where('pizza_id IN (:pizzaIds)', { pizzaIds })
      .addSelect('topping.topping_id')
      .leftJoin('pizza.toppings', 'topping')
      .getMany()

    //order_id
    const order_id = crypto.randomBytes(8).toString('base64')
    //Create the order
    const order: Order = {
      order_id,
      delivery_date: orderORM.time_preference
        ? orderORM.time_preference
        : new Date(),
      order_date: new Date(),
      //Calculate total price from all pizzas
      price: pizzas.reduce(
        (total, currentValue) => total + currentValue.price,
        0,
      ),
      payment_method: orderORM.payment_method,
      user: user,
      guest: guest,
    }

    const price = pizzas.reduce((total, currentValue) => {
      console.log(currentValue)
      return total + currentValue.price
    }, 0)

    console.log(orderORM.pizzas)

    //Delivery or takeout ?
    let address: Address = new Address()
    if (typeof orderORM.address === 'string') {
      address.address_id = orderORM.address

      order.delivery = true
      order.address = address
    }
    if (typeof orderORM.address === 'object') {
      address.city = orderORM.address.city
      address.street = orderORM.address.street
      address.number = orderORM.address.number
      address.postal_code = orderORM.address.zip_code

      address = await this.addressRepository.save(address)

      order.delivery = true
      order.address = address
    }
    if (orderORM.address === undefined) order.delivery = false

    //If price below or equal to 15 -> delivery cost 5
    order.price <= 15 && order.delivery
      ? (order.delivery_cost = 5)
      : (order.delivery_cost = 0)

    //Save order
    const result = await this.orderRepository.save(order)
    // const order_id = result.order_id

    let toppings: Array<Array<Topping>>

    //Return an arrray of an array with toppings
    toppings = orderORM.pizzas.map((pizza) =>
      pizza.topping_ids.map((topping_id) => {
        let topping: Topping = new Topping()
        topping.topping_id = topping_id
        return topping
      }),
    )

    //Save into many to many relation
    let orderPizzaSizeTopping: OrderPizzaSizeTopping[] = pizzaIds.map(
      (pizzaId, index) => ({
        pizza_id: pizzaId,
        order_id: result.order_id,
        size_id: orderORM.pizzas[index].size_id,
        toppings: toppings[index],
      }),
    )

    //Adjust the stock
    let stockToppingsArr: Array<Topping> = []
    const stockToppings = {}

    for (let i = 0; i < toppings.length; i++) {
      stockToppingsArr.push(...toppings[i])
    }
    const pizzasAmount: Record<string, number> = {}
    for (let i = 0; i < pizzaIds.length; i++) {
      pizzasAmount[pizzaIds[i]] = (pizzasAmount[pizzaIds[i]] || 0) + 1
    }

    for (let i = 0; i < pizzas.length; i++) {
      if (pizzasAmount[pizzas[i].pizza_id] > 1) {
        const index = pizzasAmount[pizzas[i].pizza_id]
        for (let a = 0; a < index; a++) {
          stockToppingsArr.push(...pizzas[i].toppings)
        }
      } else stockToppingsArr.push(...pizzas[i].toppings)
    }

    for (let i = 0; i < stockToppingsArr.length; i++) {
      stockToppings[stockToppingsArr[i].topping_id] =
        (stockToppings[stockToppingsArr[i].topping_id] || 0) + 1
    }

    const arr = Object.keys(stockToppings)

    const stock = await this.toppingRepository
      .createQueryBuilder('topping')
      .where('topping_id IN (:arr)', { arr })
      .getMany()

    //Update the stock
    const toppingStockUpdated: Array<Topping> = stock.map((topping, index) => {
      topping.stock = topping.stock - stockToppings[topping.topping_id]
      return topping
    })

    await this.toppingRepository.save(toppingStockUpdated)

    //Save into many to many relation
    await this.orderPizzaSizeRepository.save(orderPizzaSizeTopping)

    // //Return order from db
    if (user === undefined)
      return await this.orderRepository
        .createQueryBuilder('order')
        .addSelect(['guest.guest_id', 'guest.name', 'guest.lastname'])
        .innerJoin('order.guest', 'guest')
        .addSelect('pizzaSizeTopping.order_id')
        .innerJoinAndSelect('order.pizzaSizeToppings', 'pizzaSizeTopping')
        .innerJoinAndSelect('pizzaSizeTopping.pizza', 'pizza')
        .addSelect(['size.size_name', 'size.price'])
        .innerJoin('pizzaSizeTopping.size', 'size')
        .leftJoinAndSelect('pizzaSizeTopping.toppings', 'topping')
        .leftJoinAndSelect('order.address', 'adddress')

        .where('order.order_id = :order_id', { order_id })
        .getOne()

    if (user !== undefined) {
      return await this.orderRepository
        .createQueryBuilder('order')
        .addSelect(['user.user_id', 'user.name', 'user.lastname'])
        .innerJoin('order.user', 'user')
        .addSelect('pizzaSizeTopping.order_id')
        .innerJoinAndSelect('order.pizzaSizeToppings', 'pizzaSizeTopping')
        .innerJoinAndSelect('pizzaSizeTopping.pizza', 'pizza')
        .addSelect(['size.size_name', 'size.price'])
        .innerJoin('pizzaSizeTopping.size', 'size')
        .leftJoinAndSelect('pizzaSizeTopping.toppings', 'topping')
        .leftJoinAndSelect('order.address', 'adddress')

        .where('order.order_id = :order_id', { order_id })
        .getOne()
    }
  }

  async getAll(): Promise<Array<Order>> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .select(['order.order_id', 'order.order_date'])
      .addSelect(['user.user_id', 'user.name', 'user.lastname'])
      .innerJoin('order.user', 'user')
      .addSelect('pizzaSizeTopping.order_id')
      .innerJoin('order.pizzaSizeToppings', 'pizzaSizeTopping')
      .innerJoinAndSelect('pizzaSizeTopping.pizza', 'pizza')
      .addSelect(['size.size_name', 'size.price'])
      .innerJoin('pizzaSizeTopping.size', 'size')
      .orderBy('order.order_date', 'DESC')
      .getMany()
  }

  async getOne(order_id: string): Promise<Order> {
    if (!order_id)
      throw new HttpException(
        'Please provide a order id',
        HttpStatus.BAD_REQUEST,
      )
    const order: Order = await this.orderRepository
      .createQueryBuilder('order')
      .select(['order.order_id', 'order.order_date', 'order.delivery_date'])
      .addSelect(['user.user_id', 'user.name', 'user.lastname'])
      .leftJoinAndSelect('order.user', 'user')
      .addSelect(['guest.guest_id', 'guest.name', 'guest.lastname'])
      .leftJoinAndSelect('order.guest', 'guest')
      .addSelect('pizzaSizeTopping.order_id')
      .innerJoin('order.pizzaSizeToppings', 'pizzaSizeTopping')
      .innerJoinAndSelect('pizzaSizeTopping.pizza', 'pizza')
      .addSelect(['size.size_name', 'size.price'])
      .innerJoin('pizzaSizeTopping.size', 'size')
      .where('order.order_id = :order_id', { order_id })
      .getOne()

    if (!order)
      throw new HttpException(
        'No order found with that order id ',
        HttpStatus.BAD_REQUEST,
      )

    return order
  }

  async getAllUser(user_id: string): Promise<Array<Order>> {
    if (!user_id)
      throw new HttpException(
        'Please provide a user id',
        HttpStatus.BAD_REQUEST,
      )
    const orders: Array<Order> = await this.orderRepository
      .createQueryBuilder('order')
      .select(['order.order_id', 'order.order_date'])
      .addSelect(['user.user_id', 'user.name', 'user.lastname'])
      .innerJoin('order.user', 'user')
      .addSelect('pizzaSizeTopping.order_id')
      .innerJoin('order.pizzaSizeToppings', 'pizzaSizeTopping')
      .innerJoinAndSelect('pizzaSizeTopping.pizza', 'pizza')
      .addSelect(['size.size_name', 'size.price'])
      .innerJoin('pizzaSizeTopping.size', 'size')
      .orderBy('order.order_date', 'DESC')
      .where('order.user_id = :user_id', { user_id })
      .getMany()
    if (!orders)
      throw new HttpException(
        'No order found with that user id',
        HttpStatus.BAD_REQUEST,
      )
    return orders
  }
}
