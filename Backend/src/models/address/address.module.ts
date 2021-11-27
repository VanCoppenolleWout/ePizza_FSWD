import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { repositoryProviders } from 'src/database/repository.providers'
import { AddressController } from './address.controller'
import { AddressService } from './address.service'

@Module({
  controllers: [AddressController],
  providers: [...repositoryProviders, AddressService],
  imports: [DatabaseModule],
  exports: [AddressService],
})
export class AddressModule {}
