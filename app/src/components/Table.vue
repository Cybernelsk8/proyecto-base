<script setup>
    defineOptions({ inheritAttrs: false })
</script>
<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table v-bind="$attrs" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <slot name="thead"></slot>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                <slot name="tbody"></slot>
            </tbody>
            <tfoot>
                <slot name="tfoot"></slot>
            </tfoot>
        </table>
    </div>
</template>
