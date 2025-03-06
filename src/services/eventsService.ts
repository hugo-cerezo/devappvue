import type { CalendarEvent, Meals } from '@/config/interfaces'
export default {
  async getEvents() {
    try {
      const response = await fetch('https://localhost:7286/api/Event')
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      console.log('get events :', data)
      return data
    } catch (error) {
      console.error('get events error:', error)
      throw error
    }
  },
}
