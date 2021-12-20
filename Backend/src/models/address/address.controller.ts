import { Body, Controller, Param, Post } from '@nestjs/common'
import { Address } from './address.entity'
import { AddressService } from './address.service'

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}
  @Post()
  async newAddress(@Body() body): Promise<Address> {
    return await this.addressService.newAddress(body)
  }
}
