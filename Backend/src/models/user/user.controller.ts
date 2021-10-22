import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserDTO } from './user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':email')
  async findOne(@Param() params): Promise<User> {
    console.log(process.env.MYSQL_ROOT_PASSWORD)
    return await this.userService.findOne(params.email)
  }

  @Post('login')
  async userLogin(@Body() userDTO: UserDTO) {
    return await this.userService.userLogin(userDTO)
  }

  @Post('register')
  async registerUser(@Body() user: User) {
    return await this.userService.registerUser(user)
  }
}
