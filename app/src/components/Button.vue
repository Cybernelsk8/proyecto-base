<script setup>
    const props = defineProps({
        text : {
            type: String,
            default: ''
        },
        icon : {
            type: String,
            default: ''
        },
        loading : {
            type: Boolean,
            default: false
        }
    })
</script>

<template>
    <button class="btn" :class="{'px-5 py-2.5' : $props.text, 'p-3 h-8 w-8' : !$props.text}" :disabled="props.loading" >
        <Icon v-if="!props.loading" :icon="props.icon" beat />
        <span v-if="$props.text">{{ props.loading ? 'Procesando' : props.text }}</span>
        <Icon v-if="props.loading" icon="fas fa-spinner" spin />
    </button>
</template>
