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
    // Seed users if not exists
    const users: User[] = await this.seedService.findUser()
    users.length > 0 ? null : this.seedService.seedUser()

    // Seed pizza if not exists
    const pizzas: Pizza[] = await this.seedService.findPizza()
    pizzas.length > 0 ? null : this.seedService.seedPizza()
  }
}
