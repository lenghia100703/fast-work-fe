<script lang='ts' setup>
import { ref } from 'vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { PATHS } from '@/router/paths'
import { useRouter } from 'vue-router'
import FAIcon from '@/components/commons/FAIcon.vue'

const authenticationStore = useAuthenticationStore()
const visible = ref<boolean>(false)
const userInfo = ref<any>()
const router = useRouter()

function openDrawer() {
    visible.value = true
    userInfo.value = authenticationStore.userInfo
}

const handleLogout = async () => {
    await authenticationStore.logout()
    await router.push(PATHS.LOGIN)
    visible.value = false
}

defineExpose({
    openDrawer,
})
</script>
<template>
    <el-drawer v-model='visible' :with-header='false' size='20%' title='I am the title'>
        <div class='name-user'>
            <el-avatar :src='userInfo?.avatar' class='avatar-image' />
            <span class='avatar'>{{ userInfo?.username }}</span>
        </div>
        <el-menu :ellipsis='false' class='menu-bar' menu-trigger='click' mode='vertical' router>
            <el-menu-item :index='PATHS.PROFILE' :route='PATHS.PROFILE' @click='visible = false'>
                <FAIcon size='large' icon='fa-solid fa-user' class='icon' color="" />
                Hồ sơ cá nhân
            </el-menu-item>
            <el-menu-item :index='PATHS.SETTING' :route='PATHS.SETTING' @click='visible = false'>
                <FAIcon size='large' icon='fa-solid fa-gear' class='icon' color="" />
                Cài đặt
            </el-menu-item>
            <el-menu-item @click='handleLogout'>
                <FAIcon size='large' icon='fa-solid fa-right-from-bracket' class='icon' color="" />
                Đăng xuất
            </el-menu-item>
            <el-menu-item @click='visible = false'>
                <FAIcon size='large' icon='fa-solid fa-xmark' class='icon' color="" />
                Đóng
            </el-menu-item>
        </el-menu>
    </el-drawer>
</template>

<style scoped>
.el-menu {
    border: none;
}

.name-user {
    display: flex;
    align-items: center;
    padding: 10px 20px;
}

.avatar {
    margin-left: 8px;
}

.icon {
    margin-right: 10px;
}
</style>
