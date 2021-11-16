import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Pizza } from '../pizza/pizza.entity'

@Entity('Size')
export class Size {
  @PrimaryGeneratedColumn('increment')
  size_id?: number
  @Column()
  size_name?: string
  @Column()
  price?: number

  @ManyToMany(() => Pizza, (pizza) => pizza.sizes)
  pizzas?: Pizza[]
}
