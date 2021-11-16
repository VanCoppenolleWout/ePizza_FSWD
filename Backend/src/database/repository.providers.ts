import { Pizza } from 'src/models/pizza/pizza.entity'
import { Size } from 'src/models/size/size.entity'
import { User } from 'src/models/user/user.entity'
import { Connection } from 'typeorm'

export const repositoryProviders = [
  {
    provide: 'UserRepository',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'PizzaRepository',
    useFactory: (connection: Connection) => connection.getRepository(Pizza),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'SizeRepository',
    useFactory: (connection: Connection) => connection.getRepository(Size),
    inject: ['DATABASE_CONNECTION'],
  },
]
