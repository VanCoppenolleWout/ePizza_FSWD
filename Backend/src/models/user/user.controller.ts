import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get(':email')
  // async findOne(@Param() params): Promise<User> {
  //   return await this.userService.findOne(params.email)
  // }

  // @UseGuards(FirebaseAuthGuard)
  @Post('signup')
  async signUp(@Body() user: User) {
    console.log('triggered')
    return await this.userService.registerUser(user)
  }

  // @Get('login')
  // async login(@Body() body) {
  //   return await this.userService.login(body.uid)
  // }
}
