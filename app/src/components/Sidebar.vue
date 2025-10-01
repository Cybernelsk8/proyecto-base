<script setup>
import Logo from '@/components/Logo.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref, watchEffect } from 'vue'

const auth = useAuthStore()
const router = useRouter()

const selectedOption = ref({})

    function searchSelectedOption () {
       auth.userMenu.forEach(menu => {
            if(menu.active && !menu.childrens.length){
                selectedOption.value = menu
            } else if ( menu.active && menu.childrens.length) {
                menu.childrens.forEach(sub => {
                    if( sub.active ) {
                        selectedOption.value = sub
                    }
                })
            }
        })
    }


    const toggleActive = (id) => {
       auth.userMenu.forEach(menu => {
            if (menu.id == id) {
                menu.active = !menu.active
                if(!menu.childrens.length){
                    selectedOption.value = menu
                }
            } else {
                menu.active = false
                if(menu.childrens.length) {
                    menu.childrens.forEach(sub => {
                        if(sub.id == id){
                            sub.active = true
                            selectedOption.value = sub
                            menu.active = true
                        }else{
                            sub.active = false
                        }
                    })
                }
            }
        })
    }

    watchEffect(() => {
        searchSelectedOption()
    })

const handleLogout = () => {
    auth.logout()
    router.push({ name : 'Login'})
}

</script>

<template>
    <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <Icon icon="bars" />
    </button>

    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <RouterLink :to="{name : 'Home'}">
                <Logo class="h-[3.4rem] w-auto fill-gray-800 dark:fill-gray-200" />
            </RouterLink>
            <ul class="space-y-2 font-medium">
                <template v-for="page in auth.userMenu">
                    <li v-if="page.type == 'header'" class="p-3  text-gray-400 uppercase">{{ page.label }}</li>
                    <li v-else-if="page.type == 'parent' && page.childrens.length > 0">
                        <button 
                            @click="toggleActive(page.id)" 
                            class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            :class="{'bg-gray-100 dark:bg-gray-700': page.active}">
                            <Icon :icon="page.icon" />
                            <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                {{ page.label }}
                            </span>
                            <Icon icon="chevron-down" :class="page.active ? '' : 'rotate-180'" />
                        </button>
                        <ul v-if="page.active" class="py-2 space-y-2 pl-4">
                            <li v-for="child in page.childrens">
                                <RouterLink 
                                    @click="toggleActive(child.id)" 
                                    :to="{ name : child.route}" 
                                    class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    :class="{'bg-gray-100 dark:bg-gray-700': child.active}">
                                    <Icon :icon="child.icon" />
                                    <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                        {{ child.label }}
                                    </span>
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                    <li v-else>
                        <RouterLink :to="{ name : page.route}" class="flex cursor-pointer paginas-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group" >
                            <Icon :icon="page.icon" />
                            <span class="ms-3">{{ page.label }}</span>
                        </RouterLink>
                    </li>
                </template>
            </ul>
        </div>
        <div class="absolute bottom-0 left-0 justify-center w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800" sidebar-bottom-menu="">
            <Drop-Down
                :text="auth.user?.small_name ?? 'Sign in'"
                :img="auth.user?.url_photo ?? `https://ui-avatars.com/api/?name=${auth.user?.small_name}&color=7F9CF5&background=EBF4FF`" 
                icon-right="chevron-up" 
                :items="[
                    { label: 'Profile', icon: 'user', action: () => router.push({ name : 'Profile'}) },
                    { label: 'Logout', icon: 'right-to-bracket', action: () => handleLogout() },
                ]"
                variant="btn-light"
            />
        </div>
    </aside>
</template>
<style scoped>
@reference 'tailwindcss';

:deep(svg) {
    @apply transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white;
}
</style>