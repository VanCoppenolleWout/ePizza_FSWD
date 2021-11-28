import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { getAuth } from 'firebase-admin/auth'

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private userRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email: email } })
  }

  async registerUser(user: User): Promise<any> {
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
}
