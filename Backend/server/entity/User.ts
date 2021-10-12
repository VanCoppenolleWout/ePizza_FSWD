import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Address } from './Address'
import { Order } from './Order'
import { UserAddress } from './UserAddress'

@Entity('User')
export class User {
	@PrimaryGeneratedColumn('uuid')
	user_id?: string
	@Column()
	name?: string
	@Column()
	surname?: string
	@Column()
	email?: string
	@Column()
	birthdate?: Date
	@Column()
	phone_nr?: string
	@Column()
	password?: string

	@OneToMany(() => Order, (order) => order.userConnection)
	orderConnection?: Order[]

	@OneToMany(() => UserAddress, (userAddress) => userAddress.user)
	addressConnection?: Address[]
}
