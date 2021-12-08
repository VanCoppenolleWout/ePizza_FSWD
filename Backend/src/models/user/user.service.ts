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

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email: email } })
  }

  async registerUser(user: User): Promise<Record<string, string>> {
    try {
      return await getAuth()
        .createUser({
          email: user.email,
          password: user.password,
        })
        .then(async (firebaseUser) => {
          // Firebase User succesfully created
          user.user_id = firebaseUser.uid
          // Save user in database
          await this.userRepository.save(user)
          return {
            token: await getAuth().createCustomToken(firebaseUser.uid),
          }
        })
    } catch (error) {
      //Remove user if saved in firebase
      user.user_id ? getAuth().deleteUser(user.user_id) : null
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getAddress(user_id: string) {
    const userAddress = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.name', 'user.lastname', 'user.email'])
      .innerJoinAndSelect('user.addresses', 'address')
      .where('user_id = :user_id', { user_id })
      .getOne()

    return userAddress == undefined
      ? await this.userRepository
          .createQueryBuilder('user')
          .select(['user.name', 'user.lastname', 'user.email', 'user.user_id'])
          .where('user_id = :user_id', { user_id })
          .getOne()
      : userAddress
  }

  async getAdmin(headers: any) {
    const bearer = headers.authorization.replace('Bearer ', '')
    const firebaseUser = await getAuth().verifyIdToken(bearer)

    return firebaseUser.admin ? { admin: true } : { admin: false }
  }

  async getUser(user_id: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user_id = :user_id', { user_id })
      .leftJoinAndSelect('user.addresses', 'address')
      .getOne()
  }

  async addAddress(user_id: string, body: any) {
    let addressORM: Address = new Address()
    addressORM.city = body.city
    addressORM.street = body.street
    addressORM.number = body.number
    addressORM.postal_code = body.zip_code

    const address = await this.addressRepository.save(addressORM)

    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.addresses', 'address')
      .where('user_id = :user_id', { user_id })
      .getOne()

    user.addresses ? user.addresses.push(address) : (user.addresses = [address])

    console.log(user)
    return await this.userRepository.save(user)
  }
}
