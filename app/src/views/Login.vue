<script setup>
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    
    const router = useRouter()
    const auth = useAuthStore()

    const handleLogin = async() => {

        const success = await auth.login()
        
        if(success) {
            router.push({ name : 'Home'})
        }
    }

</script>
<template>
    <div class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
        <a href="" class="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10
            dark:text-white">
            <img src="https://flowbite.com/docs/images/logo.svg" class="mr-4 h-11" alt="FlowBite Logo">
            <span>Flowbite</span>
        </a>
        <!-- Card -->
        <div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to platform
            </h2>
            <form @submit.prevent="handleLogin" class="mt-8 space-y-6" >
                <div>
                    <label for="cui" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        dpi</label>
                    <input v-model="auth.credentials.cui" type="number" name="cui" id="cui"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="xxxxxxxxxxxxx" required>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        password</label>
                    <input v-model="auth.credentials.password" type="password" name="password" id="password" placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required>
                </div>
                <div class="flex items-start">
                    <a href="#" class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Lost
                        Password?</a>
                </div>
                <button type="submit"
                    class="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login
                    to your account</button>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Not registered? <a class="text-primary-700 hover:underline dark:text-primary-500">Create account</a>
                </div>

                <h1 v-if="auth.loading" class="text-center">Procesando ....</h1>
            </form>
        </div>
    </div>

</template>