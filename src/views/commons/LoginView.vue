<script setup lang='ts'>
import { onMounted, reactive, ref, watch } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { ElForm, ElMessage, type FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { PATHS } from '@/router/paths'
import { storeToRefs } from 'pinia'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import GoogleIconSvg from '@/assets/images/GoogleIconSvg.vue'
import { login } from '@/services/auth'

const submitLoading = ref<boolean>(false)
const router = useRouter()
const authenticationStore = useAuthenticationStore()
const { authenticated } = storeToRefs(authenticationStore)

const loginForm = reactive({
    email: '',
    password: '',
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
    password: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu',
            trigger: 'blur',
        },
    ],
})
const loginFormRef = ref<typeof ElForm | null>(null)

const handleLogin = async (user: any) => {
    try {
        submitLoading.value = true
        await login(user)
        await router.push(PATHS.HOME)
    } catch (e) {
        console.log(e)
        ElMessage.error(
            e.response?.data?.data
                ? e.response?.data?.data
                : 'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại!',
        )
    } finally {
        submitLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            await handleLogin(loginForm)
        } else {
            return false
        }
    })
}

// watch(
//     authenticated,
//     async (newAuth) => {
//         if (newAuth) {
//             await router.push(PATHS.HOME)
//         }
//     },
//     {
//         immediate: true,
//     },
// )

onMounted(() => {
    loadingFullScreen()
})
</script>

<template>
    <div class='container' style='height: 500px'>
        <el-row justify='center' align='middle' style='height: 100%'>
            <el-col :span='12' >
                <div class='login-title'>
                    <h1 class='title'>
                        Chào mừng bạn đã quay trở lại!
                    </h1>
                    <h3>
                        Nếu chưa có tài khoản, vui lòng đăng ký tài khoản
                    </h3>
                    <br>
                    <br>
                    <el-button style='width: 300px;' size='large' type='primary' @click='router.push("/register")' plain>Đăng ký</el-button>
                </div>
            </el-col>
            <el-col :span='12'>
                <div class='login-form'>
                    <h2 class='title'>Đăng Nhập</h2>
                    <el-form label-position='top' :model='loginForm' :rules='rules' ref='loginFormRef'>
                        <el-form-item label='Email' prop='email'>
                            <el-input v-model='loginForm.email' type='text' clearable />
                        </el-form-item>
                        <el-form-item label='Mật khẩu' prop='password'>
                            <el-input v-model='loginForm.password' type='password' :show-password='true' />
                        </el-form-item>
                        <el-form-item>
                            <div class='action'>
                                <span class='redirect'>
                                    <router-link to='/forgot-password' class='to-register'>Quên mật khẩu?</router-link>
                                </span>
                                <el-button
                                    class='btn-submit'
                                    :loading='submitLoading'
                                    type='primary'
                                    @click='submitForm(loginFormRef)'
                                    @keyup.enter='submitForm(loginFormRef)'
                                    native-type='submit'
                                >
                                    Đăng nhập
                                </el-button>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item style='width: 100%;'>
                            <el-button style='width: 100%;' type='primary' size='large'>
                                <span class='icon-google'>
                                    <GoogleIconSvg />
                                </span>
                                Đăng nhập với Google
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}


.btn-submit {
    width: 30%;
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

.login-form {
    width: 60%;
    margin-right: auto;
    margin-left: auto;
}

.icon-google {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 8px;
    width: 30px;
    height: 30px;
    border-radius: 2px;
    background-color: #fff;
}
</style>