import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { getAuth } from 'firebase-admin/auth'
import firebase from 'src/firebase/firebase'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } })
    return user
  }

  async registerUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      getAuth()
        .createUser({
          email: user.email,
          password: 'secretPassword',
        })
        .then((userRecord) => {
          // Firebase User succesfully created
          user.user_id = userRecord.uid
          // Save user in database
          this.userRepository.save(user)
        })
        .then(() => {
          resolve(HttpStatus.CREATED)
        })
        .catch((error) => {
          // Error occurred while creating user
          reject(
            new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: error,
              },
              HttpStatus.BAD_REQUEST,
            ),
          )
        })
    })
  }
}
