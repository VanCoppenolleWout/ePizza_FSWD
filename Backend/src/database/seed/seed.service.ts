import { Injectable, Inject } from '@nestjs/common'
import { Pizza } from 'src/models/pizza/pizza.entity'
import { User } from 'src/models/user/user.entity'
import { Repository } from 'typeorm'
import users from '../data/user.json'
import pizzas from '../data/pizza.json'

@Injectable()
export class SeedService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PIZZA_REPOSITORY')
    private pizzaRepository: Repository<Pizza>,
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
    return this.pizzaRepository.save(pizzas)
  }

  async findPizza(): Promise<Pizza[]> {
    return await this.pizzaRepository.find()
  }
}
