import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Pizza } from 'src/models/pizza/pizza.entity'
import { User } from 'src/models/user/user.entity'
import { Size } from 'src/models/size/size.entity'
import { Topping } from 'src/models/topping/topping.entity'

import users from '../data/user.json'
import pizzasjson from '../data/pizza.json'
import sizes from '../data/size.json'
import toppings from '../data/topping.json'

@Injectable()
export class SeedService {
  constructor(
    @Inject('UserRepository')
    private userRepository: Repository<User>,
    @Inject('PizzaRepository')
    private pizzaRepository: Repository<Pizza>,
    @Inject('SizeRepository')
    private sizeRepository: Repository<Size>,
    @Inject('ToppingRepository')
    private toppingRepository: Repository<Topping>,
  ) {}

  // USER
  async seedUser(): Promise<User[]> {
    return await this.userRepository.save(users)
  }

  async findUser(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findPizza(): Promise<Pizza[]> {
    return await this.pizzaRepository.find()
  }

  //SIZE
  async seedSize(): Promise<Size[]> {
    return await this.sizeRepository.save(sizes)
  }

  async findSize(): Promise<Size[]> {
    return await this.sizeRepository.find()
  }

  //TOPPING
  async seedTopping(): Promise<Topping[]> {
    return await this.toppingRepository.save(toppings)
  }

  async findTopping(): Promise<Topping[]> {
    return await this.toppingRepository.find()
  }

  //PIZZA
  async seedPizza(): Promise<Pizza[]> {
    const pizzas: Pizza[] = pizzasjson
    pizzas.forEach((pizza) => {
      if (pizza.name == 'Margherita') {
        let mozzarella: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d76',
        }

        pizza.toppings = [mozzarella]
      }
      if (pizza.name == 'Pepperoni') {
        let mozzarella: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d76',
        }
        let pepperoni: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d56',
        }

        pizza.toppings = [mozzarella, pepperoni]
      }

      if (pizza.name == 'Cheese & Ham') {
        const mozzarella: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d76',
        }
        const cheese: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d86',
        }
        const ham: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d46',
        }

        pizza.toppings = [mozzarella, cheese, ham]
      }

      if (pizza.name == 'Forestiere') {
        const mozzarella: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d76',
        }
        const mushrooms: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d99',
        }
        const tomatoes: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d66',
        }
        const ham: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d46',
        }

        pizza.toppings = [mozzarella, ham, mushrooms, tomatoes]
      }

      if (pizza.name == 'Hawai') {
        const mozzarella: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d76',
        }
        const mushrooms: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d99',
        }
        const pineapple: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d98',
        }
        const ham: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d46',
        }

        pizza.toppings = [mozzarella, ham, mushrooms, pineapple]
      }

      if (pizza.name == 'Hot & Spicy') {
        const mozzarella: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d76',
        }
        const tomatoes: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d66',
        }
        const chilipeppers: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d97',
        }

        pizza.toppings = [mozzarella, tomatoes, chilipeppers]
      }

      if (pizza.name == 'Barbecue Chicken') {
        const mozzarella: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d76',
        }
        const mushrooms: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d99',
        }
        const chicken: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d16',
        }

        pizza.toppings = [mozzarella, mushrooms, chicken]
      }

      if (pizza.name == 'Barbecue') {
        const mozzarella: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d76',
        }
        const mushrooms: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d99',
        }
        const bacon: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d36',
        }

        pizza.toppings = [mozzarella, mushrooms, bacon]
      }

      if (pizza.name == 'Pepperoni Supreme') {
        let mozzarella: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d76',
        }
        let pepperoni: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d56',
        }
        const mushrooms: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d99',
        }
        const tomatoes: Topping = {
          topping_id: '8c751f9f-8717-4315-ac01-144d40731d66',
        }
        pizza.toppings = [mozzarella, pepperoni, mushrooms, tomatoes]
      }
    })
    return await this.pizzaRepository.save(pizzasjson)
  }
}
