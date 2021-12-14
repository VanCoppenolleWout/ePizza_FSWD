import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Guest } from '../guest/guest.entity'
import { Order } from '../order/order.entity'
import { User } from '../user/user.entity'

@Entity('Review')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  review_id?: string
  @Column()
  title?: string
  @Column()
  description?: string
  @Column()
  stars?: number
  @Column()
  date?: Date

  @ManyToOne(() => User, (user) => user.orderConnection)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order?: Order

  @OneToOne(() => Guest)
  @JoinColumn({ name: 'guest_id' })
  guest?: Guest
}
