import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Param,
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

  @Post('signup')
  async signUp(@Body() user: User) {
    return await this.userService.registerUser(user)
  }

  @Get('admin')
  // @Roles(Role.Admin)
  // @UseGuards(FirebaseAuthGuard, RolesGuard)
  async checkAdmin(@Headers() headers) {
    return await this.userService.getAdmin(headers)
  }

  @Get('address/:user_id')
  async getAddress(@Param() params) {
    return await this.userService.getAddress(params.user_id)
  }

  @Get(':user_id')
  async getUser(@Param() params) {
    return await this.userService.getUser(params.user_id)
  }

  @Post(':user_id')
  async addAddress(@Param() params, @Body() body) {
    return await this.userService.addAddress(params.user_id, body)
  }
}
