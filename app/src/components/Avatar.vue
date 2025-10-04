<script setup>
    import { useAuthStore } from '@/stores/auth'
    import { ref } from 'vue'

    const auth = useAuthStore()

    const url_default = ref(`https://ui-avatars.com/api/?name=${auth.user?.small_name}&color=7F9CF5&background=EBF4FF`)

    const props = defineProps({
        url : {
            type : String,
            default : null,
        },
        shape : {
            type : String,
            default : 'round',
            validator : (val) => ['round','square'].includes(val.toLowerCase())
        }
    })

    defineOptions({ inheritAttrs: false })

</script>
<template>
    <img v-if="props.shape == 'round'" v-bind="$attrs" class="rounded-full object-cover object-center" :src="props.url ?? url_default" alt="Rounded avatar">
    <img v-else v-bind="$attrs" class="rounded-sm object-cover object-center" :src="props.url ?? url_default" alt="Default avatar">
</template>