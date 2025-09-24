<script setup>
    defineOptions({ inheritAttrs: false })
</script>
<template>
    <div class="my-5">
        <table v-bind="$attrs" class="w-full table-auto">
            <thead>
                <slot name="thead"></slot>
            </thead>
            <tbody class="divide-y divide-gray-100">
                <slot name="tbody"></slot>
            </tbody>
            <tfoot>
                <slot name="tfoot"></slot>
            </tfoot>
        </table>
    </div>
</template>
