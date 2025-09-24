<script setup>
    import axios from 'axios'
    import { useAuthStore } from '@/stores/auth'
    import { formatVal, handleError, setToast } from '@/helpers'

    const auth = useAuthStore()
    
    const test = async () => {
        try {
            const response = await axios.get('test')
            console.log(response.data);
            setToast('Primary','primary')
            setToast('Success','success')
            setToast('Danger','danger')
            setToast('Warning','warning')
        } catch (error) {
            handleError(error)
        }
    }

</script>
<template>
    Este es el home
    <form @submit="auth.logout">
        <button type="submit">Logout</button>
    </form>
    <br>
    {{ formatVal(25.5,'currency') }}
    <button @click="test">
        Test
    </button>
</template>