import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SeedModule } from './database/seed/seed.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './models/user/user.module'
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy'
import { ConfigModule } from '@nestjs/config'
import { PizzaModule } from './models/pizza/pizza.module'
import { OrderModule } from './models/order/order.module'

@Module({
  imports: [
    DatabaseModule,
    SeedModule,
    UserModule,
    PizzaModule,
    OrderModule,
    FirebaseAuthStrategy,
    // declare this to use dot env files
    ConfigModule.forRoot({
      envFilePath: ['ormconfig.env', '.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
