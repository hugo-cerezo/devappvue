import { defineStore } from 'pinia'

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
