import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SeedModule } from './database/seed/seed.module'
import { DatabaseModule } from './database/database.module'
import { repositoryProviders } from './database/repository.providers'
import { UserModule } from './models/user/user.module'

@Module({
  imports: [DatabaseModule, SeedModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
