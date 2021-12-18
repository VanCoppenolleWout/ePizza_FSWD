import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderPizzaSizeTopping } from '../order_pizza/order.pizza.size.entity'
import { Pizza } from '../pizza/pizza.entity'

@Entity('Topping')
@ObjectType()
export class Topping {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  topping_id?: string
  @Column()
  @Field()
  name?: string
  @Column('float')
  @Field()
  price?: number
  @Column()
  @Field()
  stock?: number
  @Column()
  @Field()
  img_url?: string

  @ManyToMany(() => Pizza, (pizza) => pizza.toppings)
  pizzas?: Pizza[]

  @ManyToMany(
    () => OrderPizzaSizeTopping,
    (orderPizzaSizeTopping) => orderPizzaSizeTopping.toppings,
  )
  orderPizzaSizeToppings?: OrderPizzaSizeTopping[]
}
