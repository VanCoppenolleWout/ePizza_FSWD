import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { getAuth } from 'firebase-admin/auth'
import MailService from '@sendgrid/mail'

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
    try {
      return await getAuth()
        .createUser({
          email: user.email,
          password: user.password,
        })
        .then(async (userRecord) => {
          await getAuth()
            .generateEmailVerificationLink(user.email)
            .then(async (link) => {
              // Construct email verification template, embed the link and send
              // using custom SMTP server.
              MailService.setApiKey(process.env.SENDGRID_API_KEY)
              const msg = {
                to: user.email,
                from: 'glennisslim@gmail.com',
                subject: 'Email verification ePizza',
                html: `<div style="">${link}</div>`,
              }
              await MailService.send(msg)
            })
          // Firebase User succesfully created
          user.user_id = userRecord.uid
          // Save user in database
          await this.userRepository.save(user)
        })
        .then(() => ({ message: 'user created', created: true }))
    } catch (error) {
      user.user_id ? getAuth().deleteUser(user.user_id) : null
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
