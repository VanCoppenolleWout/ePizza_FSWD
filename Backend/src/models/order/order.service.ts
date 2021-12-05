import { Inject, Injectable } from '@nestjs/common'
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
  ) {}

  async placeOrder(orderORM: OrderORM) {
    try {
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
        .where('pizza.pizza_id IN (:pizzaIds)', { pizzaIds })
        .getMany()

      //Create the order
      const order: Order = {
        delivery_date: orderORM.time_preference
          ? orderORM.time_preference
          : new Date(),
        order_date: new Date(),
        //Calculate total price from all pizzas
        price: pizzas.reduce(
          (total, currentValue) => total + currentValue.price,
          0,
        ),
        user: user,
        guest: guest,
      }

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
      const order_id = result.order_id

      let toppings: Array<Array<Topping>>

      //Return an arrray of an array with toppings -> Each pizza can have
      toppings = orderORM.pizzas.map((pizza) =>
        pizza.topping_ids.map((topping_id) => {
          let topping: Topping = new Topping()
          topping.topping_id = topping_id
          return topping
        }),
      )

      //Save into many to many relation
      let orderPizzaSizeTopping: OrderPizzaSizeTopping[] = pizzas.map(
        (pizza, index) => ({
          pizza_id: pizza.pizza_id,
          order_id: result.order_id,
          size_id: orderORM.pizzas[index].size_id,
          toppings: toppings[index],
        }),
      )

      // //Save into many to many relation
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
    } catch (err) {
      console.log(err)
    }
  }

  async getAll() {
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

  async getOne(order_id: string) {
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
      .where('order.order_id = :order_id', { order_id })
      .getOne()
  }

  async getAllUser(user_id: string) {
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
      .where('order.user_id = :user_id', { user_id })
      .getMany()
  }
}
