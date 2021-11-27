import { Body, Controller, Param, Post } from '@nestjs/common'
import { AddressService } from './address.service'

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}
  @Post()
  async newAddress(@Body() body) {
    return await this.addressService.newAddress(body)
  }

  @Post(':id')
  async getAddress(@Param() params) {
    return await this.addressService.getAddress(params.id)
  }
}
