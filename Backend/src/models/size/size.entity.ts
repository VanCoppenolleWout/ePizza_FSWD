import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Pizza } from '../pizza/pizza.entity'
import { PizzaSize } from '../pizzasize/pizzasize.entity'

@Entity('Size')
export class Size {
  @PrimaryGeneratedColumn('increment')
  size_id?: number
  @Column()
  size_name?: string
  @Column()
  price?: number

  @OneToMany(() => PizzaSize, (pizzasize) => pizzasize.size)
  pizzaConnection?: Pizza[]
}
