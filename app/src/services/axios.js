import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Configuración inicial de Axios
axios.defaults.withCredentials = true 
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api' 

// Interceptor para añadir el token JWT a todas las peticiones
axios.interceptors.request.use(config => {
    // LLamamos a useAuthStore() aquí, dentro de la función,
    // garantizando que el store ya esté inicializado.
    const authStore = useAuthStore()
    if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// Interceptor para manejar respuestas 401
axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401 && error.config.url !== '/login') {
        const authStore = useAuthStore()
        authStore.logout()
        window.location.href = '/login' 
    }
    return Promise.reject(error)
})

export default axios