import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { getAuth } from 'firebase-admin/auth'
import firebaseApp from '../../firebase/firebase'
import { Address } from '../address/address.entity'

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private userRepository: Repository<User>,
    @Inject('AddressRepository')
    private addressRepository: Repository<Address>,
  ) {}

  async registerUser(user: User): Promise<Record<string, string>> {
    const { name, lastname, email, password, phone_nr } = user
    if (!name || !lastname || !email || !password || !phone_nr)
      throw new HttpException(
        'Not all fields are filled in',
        HttpStatus.BAD_REQUEST,
      )

    return await getAuth()
      .createUser({
        email: user.email,
        password: user.password,
      })
      .then(async (firebaseUser) => {
        // Firebase User succesfully created
        user.user_id = firebaseUser.uid
        // Save user in database
        const res = await this.userRepository.save(user)
        if (res)
          return {
            token: await getAuth().createCustomToken(firebaseUser.uid),
          }
        else
          throw new HttpException(
            'Not all fields are filled in',
            HttpStatus.BAD_REQUEST,
          )
      })
  }

  async getAdmin(headers: any): Promise<Object> {
    if (!headers.authorization)
      throw new HttpException(
        'Oops something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )

    const bearer = headers.authorization.replace('Bearer ', '')
    const firebaseUser = await getAuth().verifyIdToken(bearer)

    if (!firebaseUser)
      throw new HttpException('User not found ..', HttpStatus.BAD_REQUEST)

    return firebaseUser.admin ? { admin: true } : { admin: false }
  }

  async getUser(user_id: string): Promise<User> {
    if (!user_id)
      throw new HttpException('No user id provided ..', HttpStatus.BAD_REQUEST)
    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.addresses', 'address')
      .where('user_id = :user_id', { user_id })
      .getOne()

    if (!user)
      throw new HttpException(
        'Oops user not found, did you provide the right user id ?',
        HttpStatus.BAD_REQUEST,
      )
    return user
  }

  async addAddress(user_id: string, body: any) {
    const { city, street, number, zip_code } = body
    if (!city || !street || !number || !zip_code)
      throw new HttpException(
        'Not all fields are filled in ..',
        HttpStatus.BAD_REQUEST,
      )
    let addressORM: Address = new Address()
    addressORM.city = body.city
    addressORM.street = body.street
    addressORM.number = body.number
    addressORM.postal_code = body.zip_code

    const address = await this.addressRepository.save(addressORM)
    if (!address)
      throw new HttpException(
        'Something went wrong saving your address ..',
        HttpStatus.BAD_REQUEST,
      )

    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.addresses', 'address')
      .where('user_id = :user_id', { user_id })
      .getOne()
    if (!user)
      throw new HttpException(
        `Oops we couldn't find that user ..`,
        HttpStatus.BAD_REQUEST,
      )

    user.addresses ? user.addresses.push(address) : (user.addresses = [address])

    return await this.userRepository.save(user)
  }
}
