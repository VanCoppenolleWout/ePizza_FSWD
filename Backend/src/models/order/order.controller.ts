import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard'
import { Order } from './order.entity'
import { OrderORM } from './order.orm'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/')
  async placeOrder(@Body() orderORM: OrderORM): Promise<Order> {
    return await this.orderService.placeOrder(orderORM)
  }

  @Get('all')
  async getAll(): Promise<Array<Order>> {
    return await this.orderService.getAll()
  }

  @Get('one/:order_id')
  async getOne(@Param() params): Promise<Order> {
    return await this.orderService.getOne(params.order_id)
  }

  @Get('all/user/:user_id')
  async getAllUser(@Param() params): Promise<Array<Order>> {
    return await this.orderService.getAllUser(params.user_id)
  }
}
