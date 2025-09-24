import { createRouter, createWebHistory } from 'vue-router'
import Default from '@/layouts/Default.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path : '/',
			component : Default,
			meta : {
				requiredAuth : true
			},
			children : [
				{
					path : '',
					name : 'Home',
					component : () => import('@/views/Welcome.vue')
				}
			]
		},
		{
			path : '/login',
			name : 'Login',
			component : () => import('@/views/Login.vue')
		},
		{
			//MANEJA TODAS LAS PAGINAS QUE NO EXISTEN Y LA REDIRIJE AL 404 NOT FOUND
			path: '/:catchAll(.*)',
			component: () => import('@/views/NotFound.vue'),
		}
	],
})

router.beforeEach((to, from) => {
	const auth = useAuthStore()

	if(to.meta.requiredAuth && !auth.isLoggedIn) {
		return { name : 'Login' }
	}else {

		return true 
	}
})

export default router
