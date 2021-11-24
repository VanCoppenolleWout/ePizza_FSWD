export interface OrderORM {
  pizza_id: string
  size_id: number
  topping_ids: Array<string>
}

export interface OrderGuestORM {
  user: UserORM
  order: OrderORM[]
}

export interface UserORM {
  name: string
  lastname: string
  email: string
  phone_nr: string
  address: AddressORM
}

export interface AddressORM {
  city: string
  street: string
  number: number
  zip_code: number
}
