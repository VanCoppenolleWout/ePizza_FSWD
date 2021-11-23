import { Body, Controller, Get, Post } from '@nestjs/common'
import { ReviewORM } from './review.orm'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  async addReview(@Body() review: ReviewORM) {
    return await this.reviewService.addReview(review)
  }

  @Get()
  getAll() {}

  @Get('one')
  getOne() {}
}
