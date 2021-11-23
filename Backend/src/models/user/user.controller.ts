import {
  Body,
  Controller,
  ExecutionContext,
  Get,
  Headers,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard'
import { Roles } from 'src/firebase/roles/roles.decorator'
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

  @UseGuards(FirebaseAuthGuard)
  @Roles()
  @Get('admin')
  async checkAdmin(@Headers() headers) {
    return await this.userService.checkAdmin(headers.authorization)
  }
}
