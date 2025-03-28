import { defineStore } from 'pinia'

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
