<script setup>
import { ref } from 'vue';

    const myOptions = [
    { 
        label: 'Usuario Administrador', 
        value: 101, 
        preview: 'Acceso total', 
        img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg' 
    },
    { 
        label: 'Usuario Sysadmin', 
        value: 102, 
        preview: 'Acceso Super total', 
        img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg' 
    },
    { 
        label: 'Ejecutar Limpieza', 
        value: 'clean_action', 
        action: () => { 
            alert('¡Acción de limpieza ejecutada!'); 
        } 
    },
    { 
        label: 'Usuario Invitado', 
        value: 202, 
        disabled: true // Opción individual deshabilitada
    },
    ];

    // Estados de v-model
    const selectedUser = ref(null); // Simple: contendrá { label: '...', value: 101, ... }
    const selectedRoles = ref([]);
</script>
<template>
    <div class="grid grid-cols-5 justify-items-center gap-3">
        <Button text="Primary" class="btn-primary" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" iconRight="chevron-down"/>
        <Button text="Alternative" class="btn-alternative" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" size="xs"/>
        <Button text="Light" class="btn-light" iconRight="chevron-down"/>
        <Button text="Dark" class="btn-dark" icon="check"/>
        <Button text="Green" class="btn-green" disabled/>
        <Button class="btn-red" icon="users"/>
        <Button text="Loading" class="btn-yellow" icon="users" :loading="true"/>
        <Button class="btn-purple" icon="users" :loading="true"/>
    </div>
    <div class="grid grid-cols-2 gap-4">
        <Input label="Dpi" icon="address-card" placeholder="xxxxxxxxxxxxxx" required />
        <Input label="Nombre" icon="user" placeholder="Campo con error" required :error="true" />
        <Input icon="search" placeholder="Buscar ..." type="search" />
        <Input placeholder="Nombre" />
    </div>
    <br>
    <div>
        <Select 
            v-model="selectedUser" 
            :options="myOptions" 
            placeholder="Selecciona un Rol" 
            :loading="false" 
            :disabled="false"
            :multiple="false"
        />

        {{ selectedUser }}
    </div>
</template>