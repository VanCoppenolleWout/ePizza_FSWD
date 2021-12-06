import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard'
import { Role } from 'src/firebase/roles/role.enum'
import { Roles } from 'src/firebase/roles/roles.decorator'
import { RolesGuard } from 'src/firebase/roles/roles.guard'
import { ReviewORM } from './review.orm'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  async addReview(@Body() review: ReviewORM) {
    return await this.reviewService.addReview(review)
  }

  @Get('/order/:order_id')
  async getOrder(@Param() params) {
    return await this.reviewService.getOrder(params.order_id)
  }

  @Get('user/:user_id')
  async getUser(@Param() params) {
    return await this.reviewService.getUser(params.user_id)
  }

  @Roles(Role.Admin)
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Get('all')
  async getAll(@Req() req) {
    return await this.reviewService.getAll(req.query)
  }
}
