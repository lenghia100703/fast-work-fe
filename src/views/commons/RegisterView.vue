<script setup lang='ts'>

import { useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { ElForm, ElMessage, FormRules } from 'element-plus'

const router = useRouter()
const rules = reactive<FormRules<any>>({
    username: [
        {
            required: true,
            message: 'Vui lòng nhập tên người dùng',
            trigger: 'blur',
        },
    ],
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
    phone: [
        {
            required: true,
            message: 'Vui lòng nhập số điện thoại',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu',
            trigger: 'blur',
        },
    ],
    confirmPassword: [
        {
            required: true,
            message: 'Vui lòng xác nhận mật khẩu',
            trigger: 'blur',
        },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value !== registerForm.password) {
                    callback('Mật khẩu xác nhận không khớp')
                } else {
                    callback()
                }
            },
            trigger: 'blur',
        },
    ],
})
const registerFormRef = ref<typeof ElForm | null>(null)
const registerForm = reactive<any>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
})
const submitLoading = ref<boolean>(false)

const register = async (user: any) => {
    submitLoading.value = true
    try {
        console.log('Register successful')
        ElMessage({
            type: 'success',
            message: 'Đăng ký thành công.',
        })
        await router.push({ name: 'home' })
    } catch (error) {
        console.error('Register failed: ' + error)
        ElMessage.error('Đăng ký thất bại. Kiểm tra lại thông tin.')
    } finally {
        submitLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        loadingFullScreen()
        if (valid) {
            await register(registerForm)
        } else {
            return false
        }
    })
}
onMounted(() => {
    loadingFullScreen()
})


</script>

<template>
    <div class='container' style='height: 500px'>
        <el-row justify='center' align='middle' style='height: 100%'>
            <el-col :span='12'>
                <div class='register-form'>
                    <h2 class="title">Đăng ký</h2>
                    <el-form label-position="top" :model="registerForm" :rules="rules" ref="registerFormRef">
                        <el-form-item label="Tên người dùng" prop="username">
                            <el-input v-model="registerForm.username" type="text" clearable />
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="registerForm.email" type="text" clearable />
                        </el-form-item>
                        <el-form-item label="Mật khẩu" prop="password">
                            <el-input v-model="registerForm.password" type="password" :show-password="true" />
                        </el-form-item>
                        <el-form-item label="Xác nhận mật khẩu" prop="confirmPassword">
                            <el-input v-model="registerForm.confirmPassword" type="password" :show-password="true" />
                        </el-form-item>
                        <el-form-item style='width: 100%;'>
                            <el-button
                                size='large'
                                class="btn-submit"
                                type="primary"
                                :loading="submitLoading"
                                @click="submitForm(registerFormRef)"
                                @keyup.enter="submitForm(registerFormRef)"
                                native-type="submit"
                            >Đăng ký
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span='12'>
                <div class='login-title'>
                    <h1 class='title'>
                        Chào mừng bạn!
                    </h1>
                    <h3>
                        Bạn đã có tài khoản, để kết nối với chúng tôi vui lòng đăng nhập
                    </h3>
                    <br>
                    <br>
                    <el-button style='width: 300px;' size='large' type='primary' @click='router.push("/login")' plain>
                        Đăng nhập
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.register-form {
    width: 60%;
    margin-right: auto;
    margin-left: auto;
}

.title {
    font-weight: 600;
    font-size: 30px;
    text-align: center;
}

.login-title {
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    justify-content: center;
    align-items: center;
}


.btn-submit {
    width: 100%;
}
</style>