import { Controller, Get } from '@nestjs/common'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/')
  async placeOrder() {
    return await this.orderService.placeOrder()
  }

  @Get('/all')
  async getAll() {
    return await this.orderService.getAll()
  }
}
