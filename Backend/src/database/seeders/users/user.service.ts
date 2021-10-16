import { Injectable, Inject } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { User } from 'src/models/user/user.entity'
import { Repository } from 'typeorm'
import users from '../../data/user.json'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async save(): Promise<void> {
    // const userORM: User[] = plainToClass(User, users)
    console.log(users)
    // this.userRepository.save(userORM)
  }

  async findAll(): Promise<User[]> {
    console.log('lets find all')
    return this.userRepository.find()
  }
}
