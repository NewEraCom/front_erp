import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';


const app = createApp(App);
import 'notivue/notifications.css';
import 'notivue/animations.css';
app.use(createPinia());
app.use(router);


app.mount('#app');
