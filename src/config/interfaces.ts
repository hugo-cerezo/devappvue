// interface Ingredients {
//   name: string
//   quantity: number
//   weight: string
// }
export interface CalendarEvent {
  title: string
  fullDay: boolean
  date: string
  type: number
  color: string
  extendedProps?: {
    ingredients: Products[]
    recipe: string[]
  }
}

export interface MealsType {
  id: number
  name: string
}
export interface Meals {
  id: string
  name: string
  products: Products[]
  recipe: string[]
  type: MealsType
  customerSuccess: number
}

export interface ProductsType {
  id: number
  name: string
}
export interface Products {
  id: string
  name: string
  orderDelay: number
  type: ProductsType
  season: number
}
