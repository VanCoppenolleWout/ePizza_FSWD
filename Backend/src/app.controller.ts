import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { FirebaseAuthGuard } from './firebase/firebase-auth.guard'
import { Role } from './firebase/roles/role.enum'
import { Roles } from './firebase/roles/roles.decorator'
import { RolesGuard } from './firebase/roles/roles.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('firebase')
  @Roles(Role.Admin)
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  get(@Req() req) {
    return req.user
  }
}
