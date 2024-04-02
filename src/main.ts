import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { PluginOptions } from 'vue-toastification';
import axios from 'axios';
import router from './router';

import 'vue-toastification/dist/index.css';

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) { // Token expired or unauthorized
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

import App from './App.vue';


const options: PluginOptions = {
    position: 'top-right',
};

const app = createApp(App);

app.use(Toast, options);

import 'notivue/notifications.css';
import 'notivue/animations.css';
app.use(createPinia());
app.use(router);


app.mount('#app');
