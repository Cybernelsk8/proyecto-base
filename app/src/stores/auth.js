import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios' 

export const useAuthStore = defineStore('auth', () => {

    const user = ref(null)
    const accessToken = ref(localStorage.getItem('access_token') || null)
    const userPermissions = ref(JSON.parse(localStorage.getItem('user_permissions')) || [])
    const userMenu = ref(JSON.parse(localStorage.getItem('user_menu')) || [])
    const loading = ref(false)
    const credentials = ref({})


    const isLoggedIn = computed(() => !!accessToken.value)
    
    const getCsrfCookie = async () => {
        try {
            await axios.get('auth/csrf-cookie')
            return true
        } catch (error) {
            console.error('Failed to get CSRF cookie:', error)
            return false
        }
    }

    const login = async () => {

        loading.value = true

        try {
            const csrfSuccess = await getCsrfCookie()
            if (!csrfSuccess) {
                return false
            }

            const response = await axios.post('auth/login', credentials.value)
            
            accessToken.value = response.data.access_token
            user.value = response.data.user

            localStorage.setItem('access_token', accessToken.value)
            localStorage.setItem('user', JSON.stringify(user.value))
            
            if (user.value.permisos) {
                userPermissions.value = user.value.permisos
                localStorage.setItem('user_permissions', JSON.stringify(userPermissions.value))
            }
            
            if (user.value.menu) {
                userMenu.value = user.value.menu
                localStorage.setItem('user_menu', JSON.stringify(userMenu.value))
            }
            
            return true

        } catch (error) {
            console.error('Login failed:', error)
            logout()
            return false
        } finally {
            loading.value = false
        }
    }

    const logout = () => {
        user.value = null
        accessToken.value = null
        userPermissions.value = []
        userMenu.value = []
        localStorage.clear()
    }

    return {
        user,
        credentials,
        accessToken,
        userPermissions,
        userMenu,
        isLoggedIn,
        loading,

        getCsrfCookie,
        login,
        logout
    }
})