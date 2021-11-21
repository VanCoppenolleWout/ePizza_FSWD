import {
  Body,
  Controller,
  ExecutionContext,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(FirebaseAuthGuard)
  @Post('signup')
  async signUp(@Body() user: User) {
    return await this.userService.registerUser(user)
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  async getUser(@Req() req) {
    console.log(req)
    return 'ok'
  }
}
