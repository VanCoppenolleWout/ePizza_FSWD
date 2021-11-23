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
import { Role } from 'src/firebase/roles/role.enum'
import { Roles } from 'src/firebase/roles/roles.decorator'
import { RolesGuard } from 'src/firebase/roles/roles.guard'
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

  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  async checkAdmin(@Res() res) {
    return { admin: true }
  }
}
