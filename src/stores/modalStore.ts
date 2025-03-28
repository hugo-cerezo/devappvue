import { defineStore } from 'pinia'
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
