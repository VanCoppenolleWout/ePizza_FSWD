import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Topping } from './topping.entity'

@Injectable()
export class ToppingService {
  constructor(
    @Inject('ToppingRepository') private toppingRepository: Repository<Topping>,
  ) {}

  async getAll() {
    return this.toppingRepository.find()
  }

  async getOne(topping_id: string) {
    return this.toppingRepository.findOne(topping_id)
  }
}
