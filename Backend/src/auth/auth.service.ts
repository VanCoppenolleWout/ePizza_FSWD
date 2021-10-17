import { Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'
import { User } from 'src/models/user/user.entity'
import { UserService } from 'src/models/user/user.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne(email)
    if (user && compare(password, user.password)) {
      return user
    }

    return null
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.user_id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
