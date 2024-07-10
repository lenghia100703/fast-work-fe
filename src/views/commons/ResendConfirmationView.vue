<script setup lang="ts">

import { ElForm, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { PATHS } from '@/router/paths.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref<typeof ElForm | null>(null)
const form = reactive({
    email: '',
})
const rules = reactive<FormRules<any>>({
    email: [
        {
            required: true,
            message: 'Vui lòng nhập email',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: 'Vui lòng nhập đúng email',
            trigger: ['blur', 'change'],
        },
    ],
})

const handleRoute = () => {
    router.push({
        name: 'login'
    })
}
</script>

<template>
    <el-card body-style="padding-bottom: 30px" style="max-width: 480px; margin-left: auto; margin-right: auto; margin-top: 50px">
        <template #header>
            <div class="card-header">
                <h1>Gửi lại mail kích hoạt</h1>
            </div>
        </template>
        <div class="form">
            <el-form :model='form' :rules='rules' ref='formRef' :hide-required-asterisk="true">
                <el-form-item prop='email'>
                    <el-input v-model="form.email" size="large" class="input" placeholder="Nhập email" clearable />
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button size="large" link type="primary" @click="handleRoute">Đăng nhập</el-button>
            <el-button style="float: right" size="large" type="primary">Gửi</el-button>
        </div>
    </el-card>
</template>

<style scoped>
.card-header {
    text-align: center;
    font-size: 20px;
}

</style>