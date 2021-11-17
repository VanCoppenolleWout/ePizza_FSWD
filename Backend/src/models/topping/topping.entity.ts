import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Pizza } from '../pizza/pizza.entity'

@Entity('Topping')
export class Topping {
  @PrimaryGeneratedColumn('uuid')
  topping_id?: string
  @Column()
  name?: string
  @Column()
  img_url?: string
  @Column()
  type?: string
  @Column()
  price?: number

  // @ManyToMany(() => Pizza, (pizza) => pizza.toppings)
  // pizzas?: Pizza[]
}
