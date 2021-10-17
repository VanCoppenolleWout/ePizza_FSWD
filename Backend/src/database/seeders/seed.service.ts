import { Injectable, Inject } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Pizza } from 'src/models/pizza/pizza.entity'
import { User } from 'src/models/user/user.entity'
import { Repository } from 'typeorm'
import users from '../data/user.json'
import pizzas from '../data/pizza.json'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PIZZA_REPOSITORY')
    private pizzaRepository: Repository<Pizza>,
  ) {}

  async seedUsers(): Promise<User[]> {
    const userORM: User[] = plainToClass(User, users)
    return this.userRepository.save(userORM)
  }

  async seedPizza(): Promise<Pizza[]> {
    const pizzaORM: Pizza[] = plainToClass(Pizza, pizzas)
    return this.pizzaRepository.save(pizzaORM)
  }

  async findAll(): Promise<User[]> {
    console.log('lets find all')
    return this.userRepository.find()
  }
}
