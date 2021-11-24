import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../user/user.entity'

@Entity('Address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  address_id?: string
  @Column({ length: 250 })
  street?: string
  @Column()
  number?: number
  @Column()
  city?: string
  @Column()
  state?: string
  @Column()
  postal_code?: string
  @Column()
  country?: string

  @ManyToMany(() => User, (user) => user.addresses)
  users?: User[]
}
