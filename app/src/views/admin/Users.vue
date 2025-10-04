<script setup>
    import { onMounted } from 'vue';
    import { useUsersStore } from '@/stores/admin/users'
    import Avatar from '@/components/Avatar.vue';
    import { formatVal } from '@/helpers';
    const store = useUsersStore()

    onMounted(() => {
        store.fetch()
    })
</script>
<template>
    <div class="flex justify-center">
        <Button @click="store.modal.new = true" text="New user" icon="plus" class="btn-primary" />
    </div>

    <Data-Table :headers="store.headers" :data="store.users" :loading="store.loading.fetch">
        
        <template #information.full_name="{item}">
            <div class="flex items-center gap-2">
                <Avatar :url="item.url_photo" class="size-12" />
                <div class="flex flex-col">
                    <span class="font-bold">{{ item.information.full_name }}</span>
                    <span class="text-xs flex items-center gap-1">
                        <Icon icon="envelope"/>
                        {{ item.information.email }}
                    </span>
                    <span class="text-xs flex items-center gap-1">
                        <Icon icon="phone"/>
                        {{ formatVal(item.information.phone,'phone') }}
                    </span>
                </div>
            </div>
        </template>
        
        <template #deleted_at="{item}">
        </template>

        <template #actions="{item}">
            <Drop-Down 
                icon="ellipsis-vertical" 
                variant="btn-alternative"
                :items="[
                    { label : 'Edit', icon : 'edit', action : () => store.edit(item) },
                    { label : 'Delete', icon : 'trash', action : () => store.deleteItem(item) },
                ]"
            />
        </template>
    </Data-Table>

    <Modal :open="store.modal.new" header="Create new user" icon="plus">
        <template #closed>
            <Button @click="store.resetData" icon="xmark" clas="btn-light" />
        </template>

        <Input v-model="store.user.name" label="Name" required />           
        <fieldset class="border rounded-lg border-gray-500 p-4">
            <legend class="px-4 font-medium text-2xl">Seleceted pages</legend>
            <div class="grid grid-cols-2 justify-items-center xl:grid-cols-4 gap-4">
                <label v-for="page in store.pages" class="flex items-center gap-2 cursor-pointer">
                    <input v-model="store.selectedPages" :value="page.id" type="checkbox" class="w-4 h-4">
                    <div class="grid">
                        <span>{{ page.label }}</span>
                        <span class="text-[9px]">({{ page.type }})</span>
                    </div>
                </label>
            </div>
        </fieldset>

        <template #footer>
            <Button @click="store.store()" text="Save" icon="save" class="btn-primary" :loading="store.loading.store" />
            <Button @click="store.resetData" text="Cancel" icon="xmark" class="btn-alternative" />
        </template>
    </Modal>

    <Modal :open="store.modal.edit" header="Edit new user" icon="edit">
        <template #closed>
            <Button @click="store.resetData" icon="xmark" clas="btn-light" />
        </template>

        <Input v-model="store.user.name" label="Name" required />           
        <fieldset class="border rounded-lg border-gray-500 p-4">
            <legend class="px-4 font-medium text-2xl">Seleceted pages</legend>
            <div class="grid grid-cols-2 justify-items-center xl:grid-cols-4 gap-4">
                <label v-for="page in store.pages" class="flex items-center gap-2 cursor-pointer">
                    <input v-model="store.selectedPages" :value="page.id" type="checkbox" class="w-4 h-4">
                    <div class="grid">
                        <span>{{ page.label }}</span>
                        <span class="text-[9px]">({{ page.type }})</span>
                    </div>
                </label>
            </div>
        </fieldset>
        <template #footer>
            <Button @click="store.update()" text="Update" icon="arrows-rotate" class="btn-primary" :loading="store.loading.update" />
            <Button @click="store.resetData" text="Cancel" icon="xmark" class="btn-alternative" />
        </template>
    </Modal>

    <Modal :open="store.modal.delete" header="Destroy user" icon="trash" size="max-w-md">
        <template #closed>
            <Button @click="store.resetData" icon="xmark" clas="btn-light" />
        </template>
        <div class="grid justify-items-center">
            <Icon icon="circle-exclamation" class="text-7xl" />
            <p class="text-xl text-center">
                Are you sure you want to delete this user?
            </p>
        </div>
        <template #footer>
            <Button @click="store.destroy()" text="Yes, i'm sure" icon="trash" class="btn-red" :loading="store.loading.destroy" />
            <Button @click="store.resetData" text="No, cancel" icon="xmark" class="btn-alternative" />
        </template>
    </Modal>
</template>