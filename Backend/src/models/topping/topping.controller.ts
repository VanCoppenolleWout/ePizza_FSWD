import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common'
import { Topping } from './topping.entity'
import { ToppingService } from './topping.service'

@Controller('topping')
export class ToppingController {
  constructor(private toppingService: ToppingService) {}

  @Get()
  async getAll(): Promise<Topping[]> {
    return await this.toppingService.getAll()
  }
  @Get('pizza/:pizza_id')
  async getAllWithPizzas(@Param() params): Promise<any> {
    return await this.toppingService.getAllWithPizzas(params.pizza_id)
  }

  @Get('/one/:topping_id')
  async getOne(@Param() params): Promise<Topping> {
    return await this.toppingService.getOne(params.topping_id)
  }

  @Put('/stock')
  async updateStock(@Body() body): Promise<any> {
    return await this.toppingService.updateStock(body)
  }

  @Put('/stock/multiple')
  async updateStockMultiple(@Body() body): Promise<any> {
    return await this.toppingService.updateStockMultiple(body)
  }

  // @Put('/topping/price')
  // async updateStockMultiple(@Body() body): Promise<any> {
  //   return await this.toppingService.updateStockMultiple(body)
  // }
}
