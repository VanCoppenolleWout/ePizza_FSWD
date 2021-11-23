import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Order } from '../order/order.entity'
import { User } from '../user/user.entity'
import { Review } from './review.entity'
import { ReviewORM } from './review.orm'

@Injectable()
export class ReviewService {
  constructor(
    @Inject('ReviewRepository')
    private reviewRepository: Repository<Review>,
  ) {}

  async addReview(reviewORM: ReviewORM) {
    //get order for the review
    const order: Order = { order_id: reviewORM.order_id }
    //get user for the review
    const user: User = { user_id: reviewORM.user_id }
    //review
    const review: Review = {
      user: user,
      order: order,
      title: reviewORM.title,
      description: reviewORM.description,
      stars: reviewORM.stars,
    }

    await this.reviewRepository.save(review)
  }
}
