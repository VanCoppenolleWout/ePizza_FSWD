import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { UserService } from './database/seeders/seed.service'

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService) {}
  getHello(): string {
    return 'Hello World!'
  }

  onApplicationBootstrap() {
    // this.userService.seedUsers()
    this.userService.seedPizza()
  }
}
