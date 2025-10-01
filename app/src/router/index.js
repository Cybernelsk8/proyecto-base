import { createRouter, createWebHistory } from 'vue-router'
import Default from '@/layouts/Default.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
    {
        path: '/',
        component: Default,
        meta: { 
            requiresAuth: true
        },
        children: [
            { 
                path: '', 
                name: 'Home', 
                component: () => import('@/views/Welcome.vue'),
                meta : {
                    requiresAuth : true
                } 
            },
            { 
                path: 'profile', 
                name: 'Profile', 
                component: () => import('@/views/Profile.vue'),
                meta : {
                    requiresAuth : true
                } 
            },
            { 
                path: 'admin', 
                meta : {
                    requiresAuth : true
                },
                children : [
                    { 
                        path: 'users', 
                        name: 'Users', 
                        component: () => import('@/views/admin/Users.vue'),
                        meta : {
                            requiresAuth : true
                        } 
                    },
                    { 
                        path: 'pages', 
                        name: 'Pages', 
                        component: () => import('@/views/admin/Pages.vue'),
                        meta : {
                            requiresAuth : true
                        } 
                    },
                ] 
            },
            
        ]
    },
    { 
        path: '/login', 
        name: 'Login', 
        component: () => import('@/views/Login.vue') 
    },
    { 
        path: '/:catchAll(.*)', 
        component: () => import('@/views/NotFound.vue') 
    }
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
        return { name: 'Home' }
    }

    return true
})

export default router
