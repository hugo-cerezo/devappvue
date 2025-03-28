export interface FullCalendarEvent {
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

export interface Meals {
  id: string
  name: string
  products: string[]
  recipe: string[]
  mealType: number
  customerSuccess: number
}

export interface Products {
  id: string
  name: string
  orderDelay: number
  type: number
  season: number
}

export interface Menu {
  id?: string
  name: string
  days: { [key: string]: string[] }
}

export interface ModalLog {
  action: string
  type: string
  width: number
}

export interface ModalState {
  isOpen: boolean
  type: string
  width: number
  logs: ModalLog[]
}
