import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { hasChanged, setToast } from '@/helpers'

export const useUsersStore = defineStore('users', () => {

    const headers = [
        { title : 'id', key : 'id', type : 'numeric' },
        { title : 'user', key : 'information.full_name' },
        { title : 'birthday', key : 'information.birthday', icon : 'cake' },
        { title : 'profile', key : 'profile.name', icon : 'tag' },
        { title : 'created at', key : 'created_at', type : 'date' },
        { title : 'state', key : 'deleted_at' },
    ]
    const users = ref([])
    const user = ref({})
    const copy_user = ref({})
    const loading = ref({
        fetch : false,
        store : false,
        update : false,
        destroy : false,
    })
    const modal = ref({
        new : false,
        edit: false,
        delete : false,
    })
    const errors = ref([])

    const fetch = async() => {
        loading.value.fetch = true
        try {
            const response = await axios.get('/admin/user')
            users.value = response.data.users
        } catch (error) {

        } finally {
            loading.value.fetch = false
        }
    }

    const store = async() => {
        loading.value.store = true
        try {
            const response = await axios.post('/admin/user',user.value)
            setToast(response.data.message,'success')
            users.value.unshift(response.data.user)
            resetData()
        } catch (error) {
            if(error.response.status == 422) {
                errors.value = error.response.data.errors
            }
        } finally {
            loading.value.store = false
        }
    }

    const edit = (item) => {
        user.value = item
        copy_user.value = JSON.parse(JSON.stringify(item))
        modal.value.edit = true
    }

    const update = async() => {
        loading.value.update = true
        try {
            if(hasChanged(user.value, copy_user.value)) {
                const response = await axios.put('/admin/user/' + user.value.id, user.value)
                setToast(response.data.message,'success')
            }
            resetData()
        } catch (error) {
            if(error.response.status == 422) {
                errors.value = error.response.data.errors
            }
        } finally {
            loading.value.update = false
        }
    }

    const deleteItem = (item) => {
        user.value = item
        modal.value.delete = true
    }

    const destroy = async() => {
        loading.value.destroy = true
        try {
            
            const response = await axios.delete('/admin/user/' + user.value.id)
            
            const index = users.value.findIndex(user => user.id === response.data.user.id)

            if (index !== -1) {
                users.value.splice(index, 1)
            }

            setToast(response.data.message,'success')
            resetData()
        } catch (error) {
            if(error.response.status == 422) {
                errors.value = error.response.data.errors
            }
        } finally {
            loading.value.destroy = false
        }
    }


    const resetData = () => {
        user.value = {}
        copy_user.value = {}
        modal.value = {
            new : false,
            edit : false,
            delete : false,
        }
        errors.value = []
    }
    
    return {
        headers,
        users,
        user,
        loading,
        modal,
        errors,

        fetch,
        store,
        edit,
        update,
        deleteItem,
        destroy,
        resetData,
    }
})
