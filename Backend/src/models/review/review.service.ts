import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
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
    @Inject('OrderRepository')
    private orderRepository: Repository<Order>,
  ) {}

  async addReview(reviewORM: ReviewORM): Promise<Review> {
    const { order_id, user_id, guest_id } = reviewORM
    if (!order_id)
      throw new HttpException('No order id provided ..', HttpStatus.BAD_REQUEST)
    if (user_id && !guest_id)
      throw new HttpException(
        'Please prvoide a user or guest id ..',
        HttpStatus.BAD_REQUEST,
      )

    //get order for the review
    let order: Order = { order_id }
    //get user/guest for the review
    const user: User = { user_id }
    const guest: Guest = { guest_id }
    //review
    let review: Review = {
      order: order,
      title: reviewORM.title,
      description: reviewORM.description,
      stars: reviewORM.stars,
      date: new Date(),
    }
    if (reviewORM.user_id) review.user = user
    if (reviewORM.guest_id) review.guest = guest

    review = await this.reviewRepository.save(review)

    if (!review)
      throw new HttpException(
        'Oops, something went wrong saving your review',
        HttpStatus.BAD_REQUEST,
      )

    order = await this.orderRepository.findOne(order_id)
    order.review = review
    await this.orderRepository.save(order)
    return review
  }

  async getUser(user_id: string): Promise<Array<Review>> {
    if (!user_id)
      throw new HttpException('No user id provided ..', HttpStatus.BAD_REQUEST)

    const review: Array<Review> = await this.reviewRepository
      .createQueryBuilder('review')
      .innerJoinAndSelect('review.user', 'user')
      .where('user.user_id = :user_id', { user_id })
      .getMany()

    if (!review)
      throw new HttpException(
        `Oops, we couldn't find that review, did you provide the correct user id ?`,
        HttpStatus.BAD_REQUEST,
      )
    return review
  }

  async getOrder(order_id: string): Promise<Review> {
    if (!order_id)
      throw new HttpException('No order id provided ..', HttpStatus.BAD_REQUEST)
    const order = await this.reviewRepository
      .createQueryBuilder('review')
      .innerJoinAndSelect('review.order', 'order')
      .innerJoinAndSelect('review.user', 'user')
      .where('order.order_id = :order_id', { order_id })
      .getOne()

    if (!order)
      throw new HttpException(
        `Oops we couldn't find that review, did you provide the correct order id ?`,
        HttpStatus.BAD_REQUEST,
      )

    return order
  }

  async getAll(req: any): Promise<Array<Review>> {
    if (req.date === 'asc') {
      return await this.reviewRepository
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.user', 'user')
        .leftJoinAndSelect('review.guest', 'guest')
        .leftJoinAndSelect('review.order', 'order')
        .orderBy('review.date', 'ASC')
        .getMany()
    } else if (req.date === 'desc') {
      return await this.reviewRepository
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.guest', 'guest')
        .leftJoinAndSelect('review.user', 'user')
        .leftJoinAndSelect('review.order', 'order')
        .orderBy('review.date', 'DESC')
        .getMany()
    } else {
      const test = await this.reviewRepository
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.user', 'user')
        .leftJoinAndSelect('review.guest', 'guest')
        .leftJoinAndSelect('review.order', 'order')
        .getMany()
      console.log(test)
      return test
    }
  }
}
