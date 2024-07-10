<script setup lang='ts'>

import { PATHS } from '@/router/paths'
import FAIcon from '@/components/commons/FAIcon.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { computed } from 'vue'

const authenticationStore = useAuthenticationStore()

authenticationStore.loadFromServer()

const isOwner = computed(() => (authenticationStore.role.toString() === 'OWNER'))

</script>

<template>
    <el-menu-item :route='PATHS.HOME' :index='PATHS.HOME'>
        <template #title>
            <FAIcon icon='fa-solid fa-home' class='icon' color="" />
            Trang chủ
        </template>
    </el-menu-item>
    <el-menu-item v-if="isOwner" :route='PATHS.MANAGE_EMPLOYEE' :index='PATHS.MANAGE_EMPLOYEE'>
        <template #title>
            <FAIcon icon='fa-solid fa-user' class='icon' color="" />
            Quản lý nhân công
        </template>
    </el-menu-item>
    <el-menu-item v-if="isOwner" :route='PATHS.MANAGE_CONSTRUCTION' :index='PATHS.MANAGE_CONSTRUCTION'>
        <template #title>
            <FAIcon icon='fa-solid fa-person-digging' class='icon' color="" />
            Quản lý công trình
        </template>
    </el-menu-item>
    <el-menu-item v-if="isOwner" :route='PATHS.MANAGE_EXPENSE' :index='PATHS.MANAGE_EXPENSE'>
        <template #title>
            <FAIcon icon='fa-solid fa-hand-holding-dollar' class='icon' color="" />
            Quản lý chi tiêu
        </template>
    </el-menu-item>
</template>

<style scoped>
.icon {
    margin-right: 8px;
}
</style>