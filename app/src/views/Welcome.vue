<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const toggle = () => {
    alert('Bienvenidos')
}

</script>
<template>
    <div class="grid grid-cols-5 justify-items-center gap-3">
        <Button text="Primary" class="btn-primary" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" iconRight="chevron-down"/>
        <Button text="Alternative" class="btn-alternative" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"/>
        <Button text="Light" class="btn-light" iconRight="chevron-down"/>
        <Button text="Dark" class="btn-dark" icon="check"/>
        <Button text="Green" class="btn-green" disabled/>
        <Button class="btn-red" icon="users"/>
        <Button text="Loading" class="btn-yellow" icon="users" :loading="true"/>
        <Button class="btn-purple" icon="users" :loading="true"/>
    </div>
    <div class="grid grid-cols-2 gap-4">
        <Input label="Dpi" icon="address-card" placeholder="X X X X X X X X X X X X X" required />
        <Input label="Nombre" icon="user" placeholder="Campo con error" required :error="true" />
        <Input icon="search" placeholder="Buscar ..." type="search" />
        <Input placeholder="Nombre" />
    </div>
</template>