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
  @Column({ nullable: true })
  state?: string
  @Column()
  postal_code?: string
  @Column({ nullable: true })
  country?: string

  @ManyToMany(() => User, (user) => user.addresses)
  users?: User[]
}
