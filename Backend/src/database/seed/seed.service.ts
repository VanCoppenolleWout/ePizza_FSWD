import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Pizza } from 'src/models/pizza/pizza.entity'
import { User } from 'src/models/user/user.entity'
import { Size } from 'src/models/size/size.entity'

import users from '../data/user.json'
import pizzas from '../data/pizza.json'
import sizes from '../data/size.json'

@Injectable()
export class SeedService {
  constructor(
    @Inject('UserRepository')
    private userRepository: Repository<User>,
    @Inject('PizzaRepository')
    private pizzaRepository: Repository<Pizza>,
    @Inject('SizeRepository')
    private sizeRepository: Repository<Size>,
  ) {}

  // USER
  async seedUser(): Promise<User[]> {
    return await this.userRepository.save(users)
  }

  async findUser(): Promise<User[]> {
    return await this.userRepository.find()
  }

  //PIZZA
  async seedPizza(): Promise<Pizza[]> {
    let test: Pizza[] = pizzas
    let anothertest = test.map((pizza, index) => {
      pizza.sizes = sizes
      return pizza
    })
    return await this.pizzaRepository.save(anothertest)
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
}
