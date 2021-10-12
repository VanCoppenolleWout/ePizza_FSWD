import { Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Address } from './Address'
import { User } from './User'

@Entity('User_Address')
export class UserAddress {
	@PrimaryColumn('uuid')
	user_id?: string
	@PrimaryColumn('uuid')
	address_id?: string

	@ManyToOne(() => User, (user) => user.addressConnection, { primary: true })
	user?: User

	@ManyToOne(() => Address, (address) => address.userConnection, {
		primary: true,
	})
	address?: Address
}
