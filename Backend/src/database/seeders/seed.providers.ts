import { Pizza } from 'src/models/pizza/pizza.entity'
import { User } from 'src/models/user/user.entity'
import { Connection } from 'typeorm'


export const seedProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'PIZZA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Pizza),
    inject: ['DATABASE_CONNECTION'],
  },
]
