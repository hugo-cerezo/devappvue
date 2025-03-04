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
    ingredients: Ingredients[]
    recipe: string[]
  }
}
export interface Plats {
  id: number
  name: string
  ingredients: Ingredients[]
  recipe: string[]
  color: number
  day: Date
  categorie: number
}
export interface Ingredients {
  id: number
  name: string
  dateOfCommand: number
  categorie: number
  season: number
}
export interface Menus {
  id: number
  name: string
  plats: Plats[]
  date: Date
}
