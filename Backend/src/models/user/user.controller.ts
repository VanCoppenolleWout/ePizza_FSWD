import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Post,
  Put,
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
  async signUp(@Body() user: User): Promise<User> {
    return await this.userService.registerUser(user)
  }

  @Get('admin')
  // @Roles(Role.Admin)
  // @UseGuards(FirebaseAuthGuard)
  async checkAdmin(@Headers() headers) {
    return await this.userService.getAdmin(headers)
  }

  @Get(':user_id')
  async getUser(@Param() params): Promise<User> {
    return await this.userService.getUser(params.user_id)
  }

  @Post('address/:user_id')
  async addAddress(@Param() params, @Body() body): Promise<User> {
    return await this.userService.addAddress(params.user_id, body)
  }

  @Put('change/address/')
  @UseGuards(FirebaseAuthGuard)
  async changeAddress(@Headers() headers, @Body() body){
    return await this.userService.changeAddress(headers, body)
  }
}
