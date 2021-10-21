import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AppService } from './app.service'
import { FirebaseAuthGuard } from './firebase/firebase-auth.guard'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private authService: AuthService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Req() req) {
  //   return this.authService.login(req.user)
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user
  // }

  @Get('firebase')
  @UseGuards(FirebaseAuthGuard)
  get(@Req() req) {
    return req.user
  }
}
