import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { SeedService } from './database/seed/seed.service'
import { Pizza } from './models/pizza/pizza.entity'
import { User } from './models/user/user.entity'

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly seedService: SeedService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async onApplicationBootstrap() {
    // // check users
    // const users: User[] = await this.seedService.findUser()
    // users.length > 0 ? null : this.seedService.seedUser()

    // // check pizza
    // const pizzas: Pizza[] = await this.seedService.findPizza()
    // pizzas.length > 0 ? null : this.seedService.seedPizza()
  }
}
