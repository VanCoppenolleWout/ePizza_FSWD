import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { UserDTO } from './user.dto'
import { createCipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'
import { User } from './user.entity'
import { hash } from 'bcrypt'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } })
    return plainToClass(User, user)
  }

  async userLogin(userDTO: UserDTO) {
    return userDTO
  }

  async registerUser(user: User): Promise<User> {
    const saltRounds = 10
    return hash(user.password, saltRounds)
      .then((hash) => {
        user.password = hash
        return this.userRepository.save(user)
      })
      .then((res) => res)
  }
}
