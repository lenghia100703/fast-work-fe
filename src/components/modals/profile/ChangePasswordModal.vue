<script setup lang='ts'>

import { reactive, ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { changePassword } from '@/services/user'
import { PATHS } from '@/router/paths'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { useRouter } from 'vue-router'

const visible = ref<boolean>(false)
const authenticationStore = useAuthenticationStore()
const router = useRouter()
const editLoading = ref<boolean>(false)
const userId = ref()
const editFormRef = ref<typeof ElForm | null>(null)
const editForm = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
})
const rules = reactive<FormRules>({
    oldPassword: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu hiện tại',
            trigger: 'blur',
        },
    ],
    newPassword: [
        {
            required: true,
            message: 'Vui lòng nhập mật khẩu mới',
            trigger: 'blur',
        },
    ],
    confirmPassword: [
        {
            required: true,
            message: 'Vui lòng nhập lại mật khẩu mới',
            trigger: 'blur',
        },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value !== editForm.value.newPassword) {
                    callback('Mật khẩu xác nhận không khớp')
                } else {
                    callback()
                }
            },
            trigger: 'blur',
        },
    ],
})

const handleChangePassword = async (data: any) => {
    editLoading.value = true
    try {
        await changePassword(userId.value, data)
        ElMessage({
            type: 'success',
            message: 'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại.',
        })
        await authenticationStore.logout()
        await router.push(PATHS.LOGIN)
    } catch (e) {
        console.log(e)
        ElMessage.error('Thay đổi mật khẩu thất bại. Vui lòng kiểm tra lại thông tin.')
    } finally {
        editLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            const formData = {
                currentPassword: editForm.value.oldPassword,
                password: editForm.value.newPassword,
                confirmPassword: editForm.value.confirmPassword,
            }
            handleChangePassword(formData)
        } else {
            return false
        }
    })
}

function openModal(data: any) {
    visible.value = true
    userId.value = data
}

const resetForm = (form: any) => {
    form.oldPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''
}

defineExpose({
    openModal,
})

</script>

<template>
    <el-dialog v-model='visible' title='Thay đổi mật khẩu' width='40%' top='14vh'>
        <el-form :model='editForm' label-position='left' ref='editFormRef' :rules='rules' label-width='150px'>
            <el-form-item label='Mật khẩu hiện tại' prop='oldPassword'>
                <el-input v-model='editForm.oldPassword' placeholder='Nhập mật khẩu hiện tại' type='password'
                          :show-password='true' clearable />
            </el-form-item>
            <el-form-item label='Mật khẩu mới' prop='newPassword'>
                <el-input v-model='editForm.newPassword' placeholder='Nhập mật khẩu mới' type='password'
                          :show-password='true' clearable />
            </el-form-item>
            <el-form-item label='Nhập lại mật khẩu' prop='confirmPassword'>
                <el-input v-model='editForm.confirmPassword' placeholder='Nhập lại mật khẩu mới' type='password'
                          :show-password='true' clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class='left-dialog-footer'>
                <el-button @click='resetForm(editForm)'>Thiết lập lại</el-button>
            </span>
            <span class='right-dialog-footer'>
                <el-button @click='visible = false'>Huỷ bỏ</el-button>
                <el-button type='primary' :loading='editLoading' @click='submitForm(editFormRef)'> Lưu lại </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.left-dialog-footer {
    float: left;
}
</style>