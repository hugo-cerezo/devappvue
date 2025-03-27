import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    type: '',
    data: null as any,
    date: null as any, // datetype ?
    width: null as any,
  }),
  actions: {
    openModal(type: string, data: any = null) {
      this.isOpen = true
      this.type = type
      this.data = data
    },
    menuModal(type: string, menuId: any = null, menuDate: any = null) {
      this.isOpen = true
      this.type = type
      this.data = menuId
      this.date = menuDate
    },
    mealModal(type: string, mealId: any = null, mealDate: any = null) {
      this.isOpen = true
      this.type = type
      this.data = mealId
      this.date = mealDate
    },
    closeModal() {
      this.isOpen = false
      this.type = ''
      this.data = null
    },
  },
})

export const menuModalStore = defineStore('menu', {
  state: () => ({
    isOpen: false,
    type: '',
    data: null as any,
    date: null as any, // datetype ?
    width: null as any,
  }),
  actions: {
    openModal(type: string, menuId: any = null, menuDate: any = null) {
      this.isOpen = true
      this.type = type
      this.data = menuId
      this.date = menuDate
    },
    closeModal() {
      this.isOpen = false
      this.type = ''
      this.data = null
    },
    changeModal() {
      this.isOpen = false
    },
  },
})

export const mealModalStore = defineStore('meal', {
  state: () => ({
    isOpen: false,
    type: '',
    data: null as any,
    date: null as any, // datetype ?
    width: null as any,
  }),
  actions: {
    openModal(type: string, mealId: any = null, mealDate: any = null) {
      this.isOpen = true
      this.type = type
      this.data = mealId
      this.date = mealDate
    },
    closeModal() {
      this.isOpen = false
      this.type = ''
      this.data = null
    },
    changeModal() {
      this.isOpen = false
    },
  },
})
