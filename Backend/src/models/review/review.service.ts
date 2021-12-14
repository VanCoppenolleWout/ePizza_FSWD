import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Guest } from '../guest/guest.entity'
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

  async addReview(reviewORM: ReviewORM): Promise<Review> {
    //get order for the review
    const order: Order = { order_id: reviewORM.order_id }
    //get user/guest for the review
    const user: User = { user_id: reviewORM.user_id }
    const guest: Guest = { guest_id: reviewORM.guest_id }
    //review
    const review: Review = {
      order: order,
      title: reviewORM.title,
      description: reviewORM.description,
      stars: reviewORM.stars,
      date: new Date(),
    }
    console.log(reviewORM.guest_id)
    if (reviewORM.user_id) review.user = user
    if (reviewORM.guest_id) review.guest = guest
    console.log(review)

    try {
      return await this.reviewRepository.save(review)
    } catch (error) {
      console.log(error)
    }
  }

  async getUser(user_id: string) {
    return await this.reviewRepository
      .createQueryBuilder('review')
      .innerJoinAndSelect('review.user', 'user')
      .where('user.user_id = :user_id', { user_id })
      .getMany()
  }

  async getOrder(order_id: string) {
    return await this.reviewRepository
      .createQueryBuilder('review')
      .innerJoinAndSelect('review.order', 'order')
      .innerJoinAndSelect('review.user', 'user')
      .where('order.order_id = :order_id', { order_id })
      .getMany()
  }

  async getAll(req) {
    console.log(req.date)
    if (req.date === 'asc') {
      return await this.reviewRepository
        .createQueryBuilder('review')
        .innerJoinAndSelect('review.user', 'user')
        .innerJoinAndSelect('review.order', 'order')
        .orderBy('review.date', 'ASC')
        .getMany()
    } else if (req.date === 'desc') {
      return await this.reviewRepository
        .createQueryBuilder('review')
        .innerJoinAndSelect('review.user', 'user')
        .innerJoinAndSelect('review.order', 'order')
        .orderBy('review.date', 'DESC')
        .getMany()
    } else
      return await this.reviewRepository
        .createQueryBuilder('review')
        .innerJoinAndSelect('review.user', 'user')
        .innerJoinAndSelect('review.order', 'order')
        .getMany()
  }
}
