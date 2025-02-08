export interface Plat {
  Name: string
  NombresPersonne: number
  Products: string[]
}

export interface PlatDuMenu {
  name: string
  jour: string
}

export interface Menu {
  Name: string
  Date: string
  Plats: PlatDuMenu[]
}
