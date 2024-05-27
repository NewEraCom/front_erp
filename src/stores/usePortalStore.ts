import { defineStore } from 'pinia'

export const usePortalStore = defineStore('ProtalStore', {
  state: () => ({
    events: [] as any[]
  }),
  actions: {
    setEventsToCalendar(events: any) {
      this.events = events
    },
    pushEventToCalendar(event: any) {
      this.events.push(event)
    }
  },
  getters: {
    getEvents: (state) => state.events
  }
})
