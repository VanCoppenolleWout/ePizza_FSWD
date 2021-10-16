import { createConnection } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'admin',
        password: 'strong_password',
        database: 'pizza',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
]
