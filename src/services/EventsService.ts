import ApiService from './apiService'
import type { FullCalendarEvent } from '@/config/interfaces'

export class EventsService extends ApiService {
  createEvents(Events: FullCalendarEvent) {
    return this.request('Event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Events),
    })
  }

  getEvents() {
    return this.request('Event')
  }

  updateEvents(id: FullCalendarEvent['id'], Events: FullCalendarEvent) {
    return this.request(`Event/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Events),
    })
  }

  deleteEvents(id: FullCalendarEvent['id']) {
    return this.request(`Event/${id}`, {
      method: 'DELETE',
    })
  }
}
export default new EventsService()
