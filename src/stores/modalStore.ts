import type { ModalState } from '@/config/interfaces'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
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
      this.logAction('show', type)
    },
    hide() {
      this.isOpen = false
      this.type = ''
    },
    close() {
      this.hide()
      this.logs = []
    },
    rewind() {
      if (this.logs.length < 2) {
        console.warn('Cannot rewind: Not enough log entries.')
        return
      }
      const previousLog = this.logs[this.logs.length - 2]
      this.type = previousLog.type
      this.width = previousLog.width
      this.logs.pop()
    },
    logAction(action: string, type: string) {
      this.logs.push({ action, type, width: this.width })
    },
  },
})
