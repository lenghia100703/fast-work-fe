<script setup lang='ts'>
import MenuHeader from '@/components/commons/MenuHeader.vue'
import { PATHS } from '@/router/paths'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { ref } from 'vue'
import AvatarDrawers from '@/components/drawers/AvatarDrawers.vue'
import { useRouter } from 'vue-router'

const authenticationStore = useAuthenticationStore()
authenticationStore.loadFromServer()
const infoRef = ref<InstanceType<typeof AvatarDrawers> | null>(null)

const isLogged = ref(true)

const router = useRouter()

const handleOpenDrawer = () => {
    infoRef.value?.openDrawer()
}
</script>

<template>
    <div class='header-content'>
        <template v-if='isLogged'>
            <el-menu class='menu' mode='horizontal' :ellipsis='false' background-color='#fff' menu-trigger='click'
                     :default-active='$route.path' >
                <el-menu-item class='desktop-logo-container no-hover' @click='router.push("/")'>
                    <h1>
                        Fast Work
                    </h1>
                </el-menu-item>

                <div class='flex-grow'></div>
                <el-menu-item class='no-hover'>
                    <span class='name-user' @click='handleOpenDrawer'>
                        <el-avatar :src='authenticationStore?.userInfo?.avatar' />
                        <span class='avatar'>{{ authenticationStore?.userInfo?.username }}</span>
                    </span>
                </el-menu-item>
            </el-menu>
        </template>

        <template v-else>
            <el-menu class='menu' mode='horizontal' :ellipsis='false' background-color='#fff' menu-trigger='click'
                     :default-active='$route.path' >
                <el-menu-item class='desktop-logo-container no-hover' @click='router.push("/register")' >
                    <img src='' class='desktop-logo' alt='logo-app' />
                </el-menu-item>
                <div class='flex-grow'></div>
                <el-menu-item
                    class='no-hover'
                    @click='router.push("/register")'
                >
                    <el-button plain>Đăng ký</el-button>
                </el-menu-item>

                <el-menu-item
                    class='no-hover'
                    @click='router.push("/login")'
                >
                    <el-button type='primary'>Đăng nhập</el-button>
                </el-menu-item>
            </el-menu>
        </template>
    </div>

    <AvatarDrawers ref='infoRef' />
</template>

<style scoped>
.desktop-logo {
    width: auto;
    height: 50px;
}

.menu {
    color: white;
}

.flex-grow {
    flex-grow: 1;
}

.menu .no-hover:hover {
    background-color: transparent !important;
}

.name-user {
    display: flex;
    align-items: center;
}

.avatar {
    margin-left: 8px;
}
</style>