<script setup lang="ts">

import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { confirmRegistration } from '@/services/auth'
import { ElMessage } from 'element-plus'
import { PATHS } from '@/router/paths.ts'

const route = useRoute()
const token = route.query.token
const isSuccess = ref(true)

const loadToken = async () => {
    try {
        await confirmRegistration({
            token: token
        })
        ElMessage({
            message: "Xác thực thành công",
            type: "success"
        })
        isSuccess.value = true
    } catch (e) {
        console.error(e)
        ElMessage({
            message: "Xác thực thất bại",
            type: "error"
        })
        isSuccess.value = false
    }
}

onMounted(async () => {
    loadingFullScreen()
    await loadToken()
})
</script>

<template>
    {{ token }}
    <el-card v-if="isSuccess" style="max-width: 480px; margin-left: auto; margin-right: auto;">
        <template #header>
            <div class="card-header">
                <h1>Xác thực mail thành công</h1>
            </div>
        </template>
        <div>
            <el-text size="large">
                Xác thực mail thành công. Vui lòng click vào
                <el-link :href="PATHS.LOGIN" type="primary">đây</el-link> để chuyển đến trang đăng nhập.
            </el-text>
        </div>
    </el-card>

    <el-card v-else style="max-width: 480px; margin-left: auto; margin-right: auto;">
        <template #header>
            <div class="card-header">
                <h1>Xác thực mail thất bại</h1>
            </div>
        </template>
        <div>
            <el-text size="large">
                Xác thực mail không thành công. Vui lòng click vào
                <el-link :href="PATHS.LOGIN" type="primary">đây</el-link> để gửi lại mail kích hoạt.
            </el-text>
        </div>
    </el-card>
</template>

<style scoped>
.card-header {
    font-size: 20px;
}
</style>