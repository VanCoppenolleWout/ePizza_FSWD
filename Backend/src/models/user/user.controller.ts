import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(@Body() user: User): Promise<User> {
    return await this.userService.registerUser(user)
  }

  @Get('admin')
  async checkAdmin(@Headers() headers) {
    return await this.userService.getAdmin(headers)
  }

  @Get(':user_id')
  async getUser(@Param() params): Promise<User> {
    return await this.userService.getUser(params.user_id)
  }

  @Post('address/:user_id')
  async addAddress(@Param() params, @Body() body){
    return await this.userService.addAddress(params.user_id, body)
  }

  @Put('change/address/')
  @UseGuards(FirebaseAuthGuard)
  async changeAddress(@Headers() headers, @Body() body) {
    return await this.userService.changeAddress(headers, body)
  }
}
