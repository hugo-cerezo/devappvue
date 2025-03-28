import { defineStore } from 'pinia'

// export const useModalStore = defineStore('modal', {
//   state: () => ({
//     isOpen: false,
//     type: '',
//     data: null as any,
//     date: null as any, // datetype ?
//     width: null as any,
//   }),
//   actions: {
//     openModal(type: string, data: any = null) {
//       this.isOpen = true
//       this.type = type
//       this.data = data
//     },
//     menuModal(type: string, menuId: any = null, menuDate: any = null) {
//       this.isOpen = true
//       this.type = type
//       this.data = menuId
//       this.date = menuDate
//     },
//     mealModal(type: string, mealId: any = null, mealDate: any = null) {
//       this.isOpen = true
//       this.type = type
//       this.data = mealId
//       this.date = mealDate
//     },
//     closeModal() {
//       this.isOpen = false
//       this.type = ''
//       this.data = null
//     },
//   },
// })

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    type: '',
    width: 0,
    logs: [],
  }),
  actions: {
    show(type: string, width: number) {
      this.isOpen = true
      this.type = type
      this.width = width
    },
    hide() {
      this.isOpen = false
      this.type = ''
    },
    close() {
      this.type = ''
      this.isOpen = false
      this.logs = []
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
    setData(data: any) {
      this.data = data
    },
    // openModal(type: string, menuId: any = null, menuDate: any = null) {
    //   this.isOpen = true
    //   this.type = type
    //   this.data = menuId
    //   this.date = menuDate
    // },
    // closeModal() {
    //   this.isOpen = false
    //   this.type = ''
    //   this.data = null
    // },
    // changeModal() {
    //   this.isOpen = false
    // },
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
    setData(mealId: any = null, mealDate: any = null) {
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
