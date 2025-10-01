<script setup>
    import { onMounted } from 'vue';
    import { usePagesStore } from '@/stores/admin/pages'
    const store = usePagesStore()

    onMounted(() => {
        store.getParents()
    })
</script>
<template>
    <div class="flex justify-center">
        <Button @click="store.modal.new = true" text="New page" icon="plus" class="btn-primary" />
    </div>
    <DataTable-ServerSide :headers="store.headers" url="admin/page">
        <template #preview="{item}">
            <Icon :icon="item.icon" class="text-xl" />
        </template>
    </DataTable-ServerSide>

    <Modal :open="store.modal.new" header="Create new page" icon="plus">

        <template #closed>
            <Button @click="store.resetData" icon="xmark" clas="btn-light" />
        </template>

        <div class="grid lg:grid-cols-2 gap-4">
            <Input v-model="store.page.label" label="Label" required />
            <Input v-model="store.page.route" label="Route" />
            <Input v-model="store.page.order" label="Order" type="number" min="1" />
            <Input v-model="store.page.icon" label="Icon" />
            
            <Select 
                v-model="store.page.type" 
                label="Type" 
                :options="[
                    { label : 'header', value : 'header'},
                    { label : 'parent', value : 'parent'},
                    { label : 'page', value : 'page'}
                ]"
                placeholder="Selected page type"
            />
            <Select 
                v-model="store.page.page_id" 
                label="Parents" 
                :options="store.parents"
                placeholder="Select parent"
            />
            
        </div>

        <template #footer>
            <Button @click="store.store()" text="Save" icon="save" class="btn-primary" :loading="store.loading.new" />
            <Button @click="store.resetData" text="Cancel" icon="xmark" class="btn-alternative" />
        </template>
    </Modal>
</template>