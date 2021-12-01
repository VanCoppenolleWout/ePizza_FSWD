export interface Pizza {
  pizza_id: string
  name: string
  size_id: number
  topping_ids: Array<string>
  price: number
  stock?: number
  img_url?: string
  vegetarian?: boolean
}
