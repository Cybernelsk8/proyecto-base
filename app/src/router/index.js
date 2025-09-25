import { createRouter, createWebHistory } from 'vue-router'
import Default from '@/layouts/Default.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
    {
        path: '/',
        component: Default,
        meta: { requiresAuth: true },
        children: [
            { path: '', name: 'Home', component: () => import('@/views/Welcome.vue') }
        ]
    },
    { path: '/login', name: 'Login', component: () => import('@/views/Login.vue') },
    { path: '/:catchAll(.*)', component: () => import('@/views/NotFound.vue') }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        return { name: 'Login' }
    }

    if (to.name === 'Login' && authStore.isLoggedIn) {
        return { name: 'Home' } // redirige a home si ya está logueado
    }

    return true
})

export default router
