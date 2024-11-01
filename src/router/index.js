import {createRouter, createWebHistory} from 'vue-router'
import Payment from "@/pages/Payment.vue";
import Transaction from "@/pages/Transaction.vue";

const routes = [

    {
        path: '/pay',
        name: 'Pay',
        component: Payment,
    },
    {
        path: '/transactions',
        name: 'Transaction',
        component: Transaction,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
