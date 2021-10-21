import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { UserDTO } from './user.dto'
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
    return user
  }

  async userLogin(userDTO: UserDTO) {
    return userDTO
  }

  async registerUser(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user)
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Bad request: Check user info',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
