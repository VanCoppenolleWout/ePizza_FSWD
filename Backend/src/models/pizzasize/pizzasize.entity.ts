import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Pizza } from '../pizza/pizza.entity'
import { Size } from '../size/size.entity'

@Entity('Pizza_Size')
export class PizzaSize {
  @PrimaryGeneratedColumn('uuid')
  pizza_size_id?: string
  @PrimaryColumn('uuid')
  size_id?: number
  @PrimaryColumn('uuid')
  pizza_id?: string

  @ManyToOne(() => Size, (size) => size.pizzaConnection)
  @JoinColumn({ name: 'size_id' })
  size?: Size
  @ManyToOne(() => Pizza, (pizza) => pizza.sizeConnection)
  @JoinColumn({ name: 'pizza_id' })
  pizza?: Pizza
}
