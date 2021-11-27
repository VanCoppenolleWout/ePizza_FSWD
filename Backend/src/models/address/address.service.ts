import { HttpCode, HttpException, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from '../user/user.entity'
import { Address } from './address.entity'

@Injectable()
export class AddressService {
  constructor(
    @Inject('AddressRepository')
    private addressRepository: Repository<Address>,
  ) {}

  async newAddress(body) {
    try {
      let user: User = { user_id: body.user_id }
      let address: Address = {
        city: body.city,
        street: body.street,
        number: body.number,
        postal_code: body.zip_code,
        users: [user],
      }
      return await this.addressRepository.save(address)
    } catch (error) {
      throw new HttpException('Oops something went wrong', 500)
    }
  }

  async getAddress(user_id: string) {
    console.log(user_id)
    const address = await this.addressRepository
      .createQueryBuilder('address')

      .getMany()

    console.log(address)
  }
}
