import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import { initToken } from '~/utils/token';

import '@unocss/reset/normalize.css';
import './styles/main.css';
import 'uno.css';
import './utils/dayjs';
import { initI18nScope, installI18n } from '~/utils/i18n';
import { initAxios } from '~/utils/http/axios';
export const routes = setupLayouts(generatedRoutes);
export const mode = import.meta.env.MODE;
const head = createHead();

initAxios();
const pinia = createPinia();
export const app = createApp(App);
export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
app.use(router).use(pinia).use(head);
export const i18nGlobal = installI18n({ app });
app.mount('#app');
initToken();
initI18nScope();
