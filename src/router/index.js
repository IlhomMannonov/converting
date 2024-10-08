import { createRouter, createWebHistory } from 'vue-router'
import Convertor from '@/pages/Convertor.vue'

const routes = [
    {
        path: '/',
        name: 'Base',
        component: Convertor,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
