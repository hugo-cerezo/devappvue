// interface Ingredients {
//   name: string
//   quantity: number
//   weight: string
// }
// export interface CalendarEvent {
//   title: string
//   fullDay: boolean
//   date: string
//   type: number
//   color: string
//   extendedProps?: {
//     ingredients: Products[]
//     recipe: string[]
//   }
// }

export interface CalendarEvent {
  id?: string
  groupId?: string
  allDay?: boolean
  start: Date
  end?: Date
  startStr?: string
  endStr?: string
  title: string
  url?: string
  classNames?: string[]
  editable?: boolean
  startEditable?: boolean
  durationEditable?: boolean
  resourceEditable?: boolean
  display?: 'auto' | 'block' | 'list-item' | 'background' | 'inverse-background' | 'none'
  overlap?: boolean
  constraint?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  extendedProps?: {
    [key: string]: any
  }
  source?: string
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

export interface Menu {
  id?: string
  name: string
  days: string[][]
}

export interface MealsDataToDisplay {
  id: string
  name: string
  type: MealsType
  customerSuccess: number
}
