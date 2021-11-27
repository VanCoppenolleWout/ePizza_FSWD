export interface OrderORM {
  user: UserORM | string
  address: AddressORM | string | undefined
  pizzas: Pizzas[]
  time_preference: Date
}

export interface Pizzas {
  pizza_id: string
  size_id: number
  topping_ids: Array<string>
}

export interface UserORM {
  name: string
  lastname: string
  email: string
  address: AddressORM
}

export interface AddressORM {
  city: string
  street: string
  number: number
  zip_code: string
}
