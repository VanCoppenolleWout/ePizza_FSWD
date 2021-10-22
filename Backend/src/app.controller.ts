import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { FirebaseAuthGuard } from './firebase/firebase-auth.guard'
import { RolesGuard } from './firebase/roles.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('firebase')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  get(@Req() req) {
    return req.user
  }
}
