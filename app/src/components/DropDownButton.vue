<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import { onClickOutside } from '@vueuse/core'

    const props = defineProps({
        icon: { type : String, default: 'fas fa-ellipsis-vertical' },
        title: String,
        items: Array,
        class: String,
    })


    const open = ref(false)
    const target = ref(null)

    const toggle = () => (open.value = !open.value)
    const close = () => (open.value = false)

    onClickOutside(target, () => close())

    const handleKey = (e) => {
        if (e.key === 'Escape') close()
    }

    onMounted(() => window.addEventListener('keydown', handleKey))
    onUnmounted(() => window.removeEventListener('keydown', handleKey))
</script>

<template>
    <div class="relative inline-block" ref="target" title="+ opciones">
        <Icon :icon="props.icon" class="cursor-pointer px-3 py-2 hover:scale-125 text-gray-500" @click="toggle" />

        <Transition name="fade">
            <ul v-show="open"
                class="absolute right-0 mt-1 bg-white text-gray-500 border border-gray-200 shadow-lg rounded-md p-2 text-xs z-20 grid gap-2 min-w-[120px]">
                <template v-if="items?.length">
                    <li v-for="(item, index) in items" :key="index" @click="item.action?.()" :class="props.class ?? ''"
                        class="cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1 flex items-center gap-2">
                        <Icon v-if="item.icon" :icon="item.icon" />
                        {{ item.label }}
                    </li>
                </template>
                <slot v-else />
            </ul>
        </Transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
