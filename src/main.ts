import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import globalMixin from './mixins/global';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(store).mixin(globalMixin).mount('#app');
