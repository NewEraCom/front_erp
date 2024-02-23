import { defineStore } from 'pinia';

export const useSharedStore = defineStore('ShareStore', {
    state: () => ({
        events: [],
    }),
    actions: {
        setEvents(data: any) {
            this.events = [];
            data.forEach((event: any) => {
                const item = {
                    title: event.event,
                    start: event.date + ' ' + event.start,
                    end: event.date + ' ' + event.end,
                    content: event.comment,
                    class: event.color,
                };
                this.events.push(item);
            });
        },
        addEvents(event: any) {

            const item = {
                title: event.event,
                start: event.date + ' ' + event.start,
                end: event.date + ' ' + event.end,
                content: event.comment,
                class: event.color,
            };
            this.events.push(item);

        }
    }
});