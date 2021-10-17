import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SeedModule } from './database/seed/seed.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './models/user/user.module'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, SeedModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
