import './assets/main.css'

import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import router from "@/router/routers";
import store from "@/store";
import axios from 'axios';

import App from './App.vue';


const config = {
    baseURL: '/api/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
    changeOrigin: true
};

const instance = axios.create(config);
instance.defaults.headers.common["Authorization"] = store.state.token
const app = createApp(App)
app.config.globalProperties.$axios = instance;
app.config.globalProperties.$store = store;
app.use(ArcoVue).use(ArcoVueIcon).use(router).use(store)
app.mount("#app")

