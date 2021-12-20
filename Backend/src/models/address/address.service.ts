import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from '../user/user.entity'
import { Address } from './address.entity'

@Injectable()
export class AddressService {
  constructor(
    @Inject('AddressRepository')
    private addressRepository: Repository<Address>,
  ) {}

  async newAddress(body): Promise<Address> {
    const { user_id, city, street, number, zip_code } = body
    if (!user_id || !city || !street || !number || !zip_code)
      throw new HttpException(
        'Pleasse fill in all fields ..',
        HttpStatus.BAD_REQUEST,
      )
    let user: User = { user_id: user_id }
    let address: Address = {
      city,
      street,
      number,
      postal_code: zip_code,
      users: [user],
    }
    return await this.addressRepository.save(address)
  }
}
