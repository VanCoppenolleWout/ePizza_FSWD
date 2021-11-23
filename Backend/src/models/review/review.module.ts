import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { repositoryProviders } from 'src/database/repository.providers'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'

@Module({
  controllers: [ReviewController],
  imports: [DatabaseModule],
  providers: [...repositoryProviders, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
