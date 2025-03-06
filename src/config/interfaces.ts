interface Ingredients {
  name: string
  quantity: number
  weight: string
}
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
