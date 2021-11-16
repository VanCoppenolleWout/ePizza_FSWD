import { Controller, Get } from '@nestjs/common'
import { PizzaService } from './pizza.service'

@Controller('pizza')
export class PizzaController {
  constructor(private pizzaService: PizzaService) {}

  @Get('all')
  async getAll() {
    return await this.pizzaService.getAll()
  }
}
