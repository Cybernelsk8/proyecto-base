import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { setToast } from '@/helpers'

export const usePagesStore = defineStore('pages', () => {

    const headers = [
        { title : 'id', key : 'id' },
        { title : 'label', key : 'label' },
        { title : 'route', key : 'route' },
        { title : 'icon', key : 'icon' },
        { title : 'preview', key : 'preview', exclude : true },
        { title : 'parent', key : 'parent.label' },
        { title : 'type', key : 'type' },
        { title : 'order', key : 'order' },
        { title : '', key : 'actions', exclude : true  },
    ]
    const parents = ref([])
    const page = ref({})
    const copy_page = ref({})
    const loading = ref({
        parents : false,
        store : false,
    })
    const modal = ref({
        new : false,
    })
    const errors = ref([])

    const getParents = async() => {
        loading.value.parents = true
        try {
            const response = await axios.get('/admin/page/get-parents')
            parents.value = response.data
        } catch (error) {

        } finally {
            loading.value.parents = false
        }
    }

    const store = async() => {
        loading.value.store = true
        try {
            const response = await axios.post('/admin/page',page.value)
            setToast(response.data.message,'success')
            resetData()
        } catch (error) {
            if(error.response.status == 422) {
                errors.value = error.response.data.errors
            }
        } finally {
            loading.value.store = false
        }
    }

    const resetData = () => {
        page.value = {}
        copy_page.value = {}
        modal.value = {
            new : false,
        }
        errors.value = []
    }
    
    return {
        headers,
        parents,
        page,
        loading,
        modal,
        errors,

        getParents,
        store,
        resetData,
    }
})
