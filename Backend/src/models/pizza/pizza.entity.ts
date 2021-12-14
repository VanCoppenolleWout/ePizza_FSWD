import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderPizzaSizeTopping } from '../order_pizza/order.pizza.size.entity'
import { Topping } from '../topping/topping.entity'

@Entity('Pizza')
@ObjectType()
export class Pizza {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  pizza_id?: string
  @Column()
  @Field()
  name?: string
  @Column()
  @Field()
  description?: string
  @Column()
  @Field()
  stock?: number
  @Column()
  @Field()
  price?: number
  @Column()
  @Field()
  img_url?: string
  @Column()
  @Field()
  img_url_nobg?: string
  @Column()
  @Field()
  vegetarian?: boolean

  @ManyToMany(() => Topping, (toppings) => toppings.pizzas, { cascade: true })
  @JoinTable({ name: 'Pizza_Topping' })
  toppings?: Topping[]
  @OneToMany(() => OrderPizzaSizeTopping, (orders) => orders.pizza)
  pizzaSizeToppings?: OrderPizzaSizeTopping[]
}
