<script setup>
import { useAttrs, computed } from 'vue'

const attrs = useAttrs()

const props = defineProps({
    option: {
        type: String,
        default: 'default',
        validator: val => ['default','title', 'title-icon-left', 'title-icon-right', 'icon-left', 'icon-right'].includes(val),
    },
    title: { type: String, default: '' },
    icon: { type: String, default: '' },
    modelValue: '',
    error: { type: Boolean, default: false },
    items: { type: Object, default: () => ({}) },
    variant: {
        type: String,
        default: 'default',
        validator: val => ['primary', 'secondary', 'success', 'warning', 'danger','default'].includes(val),
    }
})

const emit = defineEmits(['update:modelValue'])

defineOptions({ inheritAttrs: false })

const variantClasses = {
    default: { text: 'text-gray-600', border: 'border-gray-300', ring: 'ring-gray-400', errorText: 'text-gray-700', errorBorder: 'border-red-700', errorRing: 'ring-red-500' },
    primary: { text: 'text-violet-400', border: 'border-violet-300', ring: 'ring-violet-400', errorText: 'text-red-500', errorBorder: 'border-red-500', errorRing: 'ring-red-300' },
    secondary: { text: 'text-gray-600', border: 'border-gray-300', ring: 'ring-gray-400', errorText: 'text-red-500', errorBorder: 'border-red-500', errorRing: 'ring-red-300' },
    success: { text: 'text-green-600', border: 'border-green-300', ring: 'ring-green-400', errorText: 'text-red-500', errorBorder: 'border-red-500', errorRing: 'ring-red-300' },
    warning: { text: 'text-yellow-600', border: 'border-yellow-300', ring: 'ring-yellow-400', errorText: 'text-red-500', errorBorder: 'border-red-500', errorRing: 'ring-red-300' },
    danger: { text: 'text-red-600', border: 'border-red-300', ring: 'ring-red-400', errorText: 'text-red-700', errorBorder: 'border-red-700', errorRing: 'ring-red-500' },
}

const currentVariant = computed(() => variantClasses[props.variant])
const textColor = computed(() => props.error ? currentVariant.value.errorText : currentVariant.value.text)
const borderColor = computed(() => props.error ? currentVariant.value.errorBorder : currentVariant.value.border)
const ringColor = computed(() => props.error ? currentVariant.value.errorRing : currentVariant.value.ring)

const baseContainerClass = computed(() => [
    'flex items-center input overflow-hidden parent',
    '[&:has(.child:focus)]:ring-2',
    '[&:has(.child:invalid)]:ring-red-500',
    `[&:has(.child:valid)]:${ringColor.value}`,
    `[&:has(.child:focus)]:${ringColor.value}`,
    borderColor.value,
    textColor.value
].join(' '))

const baseInputClass = computed(() => {
    if(hasIcon.value) {
        return `focus:outline-none child w-full ${textColor.value}`
    }else {
        return `focus:outline-none child w-full pr-2.5 ${textColor.value}`
    }
})

const hasTitle = computed(() => props.option.includes('title'))
const hasIcon = computed(() => props.option.includes('icon'))
const iconLeft = computed(() => props.option.includes('left'))
const iconRight = computed(() => props.option.includes('right'))

const handleInput = (e) => {
    emit('update:modelValue', e.target.value)
}
</script>

<template>
    <div v-if="hasTitle || hasIcon" class="flex flex-col gap-1" :class="textColor">
        <label v-if="hasTitle && title" class="inline-flex items-center gap-1 font-medium">
            {{ title }}
            <span v-if="attrs.hasOwnProperty('required')" class="text-red-500">*</span>
        </label>

        <div :class="[baseContainerClass, iconLeft ? 'pr-2.5' : 'pl-2.5']">
            <div v-if="iconLeft && icon" class="h-full w-8 flex items-center justify-center">
                <Icon :icon="icon" />
            </div>

            <input :value="modelValue" @input="handleInput" v-bind="$attrs" :class="baseInputClass" />

            <div v-if="iconRight && icon" class="h-full w-8 flex items-center justify-center">
                <Icon :icon="icon" />
            </div>
        </div>
    </div>

    <input v-else :value="modelValue" @input="handleInput" v-bind="$attrs"
        class="input focus:ring-2 focus:outline-none px-2.5 invalid:ring-red-500" :class="[
            props.error ? currentVariant.errorBorder : currentVariant.border,
            props.error ? currentVariant.errorRing : currentVariant.ring,
            props.error ? currentVariant.errorText : currentVariant.text
        ]" />
</template>

