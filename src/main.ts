import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { PluginOptions } from 'vue-toastification';

import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';


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
