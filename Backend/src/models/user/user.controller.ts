import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard'
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
    return await this.userService.registerUser(user)
  }


}
