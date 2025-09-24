<script setup>
    const props = defineProps({
        open : {
            type : Boolean,
            default : false
        },
        title : {
            type : String,
            default : ''
        },
        icon : {
            type : String,
            default : ''
        },
    })

    defineOptions({
        inheritAttrs: false
    })

</script>

<template>
    <Transition>
        <div v-if="props.open" class="inset-0 fixed h-screen w-screen bg-gray-900/30 z-30 overflow-auto">
            <div class="relative flex justify-center items-center-safe h-screen p-2">
                <Card v-bind="$attrs" class="bg-white relative mb-7">
                    <template #header>
                        <div class="flex justify-between px-3 items-center p-2">
                            <div class="flex items-center gap-2">
                                <Icon v-if="$props.icon"  :icon="props.icon" />
                                <h1 v-if="$props.title" class="font-medium">{{ props.title }}</h1>
                            </div>
                            <slot name="icon-close"></slot>
                        </div>
                    </template>
                    <div class="px-4">
                        <slot />
                    </div>
                    <template #footer>
                        <div class="flex justify-evenly gap-2 p-2">
                            <slot name="footer"></slot>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
    .v-enter-active, .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from, .v-leave-to {
        opacity: 0;
    }
</style>
