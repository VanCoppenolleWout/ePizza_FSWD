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
import { OrderGuestORM, OrderORM, UserORM } from './order.orm'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/')
  @UseGuards(FirebaseAuthGuard)
  async placeOrder(@Body() orderORM: OrderORM[], @Headers() headers) {
    return await this.orderService.placeOrder(orderORM, headers)
  }

  @Post('/guest')
  async placeOrderGuest(@Body() body: OrderGuestORM) {
    console.log(body.order[0].topping_ids)
    // return await this.orderService.placeOrder(orderORM, userORM)
  }

  @Get('all')
  async getAll() {
    return await this.orderService.getAll()
  }

  @Get('order/:order_id')
  async getOne(@Param() params) {
    return await this.orderService.getOne(params.order_id)
  }

  @Get('all/user/:user_id')
  async getAllUser(@Param() params) {
    return await this.orderService.getAllUser(params.user_id)
  }
}
