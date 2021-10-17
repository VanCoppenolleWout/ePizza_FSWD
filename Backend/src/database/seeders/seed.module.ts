import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database.module'
import { seedProviders } from './seed.providers'
import { UserService } from './seed.service'
@Module({
  imports: [DatabaseModule],
  providers: [...seedProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
