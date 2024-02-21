import { api } from '@/utils';
import { useSharedStore } from '@/store';

const createEvent = async (data: any) => {
    try {
        const response = await api().post('/events/create', data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

const getEvent = async (type: string) => {
    try {
        const response = await api().get('/events/get/' + type);
        const sharedStore = useSharedStore();
        sharedStore.setEvents(response.data.events);
    } catch (error) {
        return Promise.reject(error);
    }
};


export default {
    createEvent,
    getEvent
};