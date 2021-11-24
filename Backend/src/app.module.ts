import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { SeedModule } from './database/seed/seed.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './models/user/user.module'
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy'
import { ConfigModule } from '@nestjs/config'
import { PizzaModule } from './models/pizza/pizza.module'
import { OrderModule } from './models/order/order.module'
import { SizeModule } from './models/size/size.module'
import { ToppingModule } from './models/topping/topping.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ReviewModule } from './models/review/review.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './http-exception-filters/http-exception.filter'

@Module({
  imports: [
    DatabaseModule,
    SeedModule,
    UserModule,
    PizzaModule,
    OrderModule,
    SizeModule,
    ToppingModule,
    ReviewModule,
    FirebaseAuthStrategy,
    // declare this to use dot env files
    ConfigModule.forRoot({
      envFilePath: ['ormconfig.env', '.env'],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
