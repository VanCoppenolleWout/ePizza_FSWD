import { Order } from 'src/models/order/order.entity'
import { OrderPizzaSize } from 'src/models/order_pizza/order.pizza.size.entity'
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
  {
    provide: 'OrderRepository',
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'OrderPizzaSizeRepository',
    useFactory: (connection: Connection) => connection.getRepository(OrderPizzaSize),
    inject: ['DATABASE_CONNECTION'],
  },
]
