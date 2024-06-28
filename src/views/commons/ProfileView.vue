<script setup lang='ts'>

import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { onMounted, reactive, ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { editUser } from '@/services/user'
import ChangePasswordModal from '@/components/modals/profile/ChangePasswordModal.vue'
import { PROVIDERS } from '@/constants/provider'
import SwitchItem from '@/components/commons/SwitchItem.vue'

const useAuthentication = useAuthenticationStore()
const changePasswordModal = ref<InstanceType<typeof ChangePasswordModal>>()
const editLoading = ref(false)
const editFormRef = ref<typeof ElForm | null>(null)
const tab = ref(0)
const darkModeVisible = ref(false)
const valueNotification = ref('Tất cả')
const options = ['Tất cả', 'Chưa đọc']

const form = ref({
    email: useAuthentication.userInfo?.email,
    age: useAuthentication.userInfo?.age,
    username: useAuthentication.userInfo?.username,
    phone: useAuthentication.userInfo?.phone,
    address: useAuthentication.userInfo?.address,
    role: useAuthentication.userInfo?.role,
    provider: useAuthentication.userInfo?.provider,
    avatar: useAuthentication.userInfo?.avatar,
})

const rules = reactive<FormRules>({
    username: [
        {
            required: true,
            message: 'Vui lòng nhập tên người dùng',
            trigger: 'blur',
        },
    ],
})

const handleSubmit = async (data: any) => {
    editLoading.value = true
    try {
        await editUser(useAuthentication.userInfo?.id, data)
        ElMessage({
            type: 'success',
            message: 'Sửa thành công',
        })
    } catch (e) {
        console.log(e)
        ElMessage({
            type: 'error',
            message: 'Sửa thất bại',
        })
    } finally {
        editLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            const formData = new FormData()
            formData.append('email', form.value.email)
            formData.append('username', form.value.username)
            formData.append('phone', form.value.phone)
            formData.append('address', form.value.address)
            formData.append('avatarUrl', form.value.avatar)
            await handleSubmit(formData)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.username = useAuthentication.userInfo?.username
    form.phone = useAuthentication.userInfo?.phone
    form.address = useAuthentication.userInfo?.address
}

const handleChangeTab = (value: any) => {
    tab.value = value
    console.log(tab.value)
}

onMounted(() => {
    useAuthentication.loadFromServer()
    loadingFullScreen()
})

</script>

<template>
    <div class='profile-page'>
        <h1 class="title">Cài Đặt Tài Khoản</h1>
        <br />
        <el-row justify="space-evenly">
            <el-col :span="4">
                <el-card body-style="padding: 20px 0 20px 0">
                    <div class="button-group">
                        <div
                            :class="{ active: tab === 0 }"
                            @click="handleChangeTab(0)"
                            class="custom-btn"
                        >Thông tin tài khoản</div>
                        <div
                            :class="{ active: tab === 1 }"
                            @click="handleChangeTab(1)"
                            class="custom-btn"
                        >Cài đặt giao diện</div>
                        <div
                            :class="{ active: tab === 2 }"
                            @click="handleChangeTab(2)"
                            class="custom-btn"
                        >Thông báo</div>
                        <div
                            :class="{ active: tab === 3 }"
                            @click="handleChangeTab(3)"
                            class="custom-btn"
                        >Nâng cấp tài khoản</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-card v-if="tab === 0">
                    <div class='user-container'>
                        <div class='user-info-detail'>
                            <el-form
                                label-position='left'
                                label-width='150px'
                                :model='form'
                                :rules='rules'
                                style='max-width: 600px; margin-left: auto; margin-right: auto;'
                                ref='editFormRef'
                                :hide-required-asterisk='true'
                            >
                                <div class='block avatar-image-block'>
                                    <el-avatar
                                        class='avatar-image'
                                        :size='180'
                                        :src='form.avatar'
                                        referrerpolicy='no-referrer' />
                                </div>
                                <br />
                                <br />
                                <el-form-item label='Email' prop='email'>
                        <span class='user-info-detail'>
                            {{ form.email }}
                        </span>
                                </el-form-item>
                                <el-form-item label='Tên' prop='username'>
                                    <el-input v-model='form.username' type='text' placeholder='Nhập họ tên' clearable
                                              spellcheck='false' />
                                    <el-link
                                        :underline='false'
                                        class='btn-function'
                                        @click='changePasswordModal?.openModal(useAuthentication.userInfo?.id)'
                                    >Thay đổi mật khẩu
                                    </el-link>
                                </el-form-item>
                                <el-form-item label='Tuổi' prop='age'>
                                    <el-input v-model='form.age' type='text' placeholder='Nhập số tuổi' clearable
                                              spellcheck='false' />
                                </el-form-item>
                                <el-form-item label='Số điện thoại' prop='phone'>
                                    <el-input v-model='form.phone' type='text' placeholder='Nhập số điện thoại'
                                              clearable
                                              spellcheck='false' />
                                </el-form-item>
                                <el-form-item label='Địa chỉ' prop='address'>
                                    <el-input v-model='form.address' type='text' placeholder='Nhập địa chỉ' clearable
                                              spellcheck='false' />
                                </el-form-item>
                                <el-form-item label='Vai trò' prop='role'>
                                    <el-text class='user-info-detail' type='success' tag="b">
                                        {{ form.role }}
                                    </el-text>
                                </el-form-item>
                                <el-form-item label='Nền tảng đăng ký' prop='provider'>
                                    <el-text class='user-info-detail' type='info' tag="b"
                                             v-if="form.provider === PROVIDERS.LOCAL">
                                        {{ form.provider }}
                                    </el-text>
                                    <el-text class='user-info-detail' type='warning' tag="b"
                                             v-else-if="form.provider === PROVIDERS.GOOGLE">
                                        {{ form.provider }}
                                    </el-text>
                                    <el-text class='user-info-detail' type='primary' tag="b"
                                             v-else-if="form.provider === PROVIDERS.FACEBOOK">
                                        {{ form.provider }}
                                    </el-text>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type='primary' @click='submitForm(editFormRef)' :loading='editLoading'>
                                        Lưu lại
                                    </el-button>
                                    <el-button @click='resetForm(form)'>
                                        Thiết lập lại
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </el-card>
                <el-card v-else-if="tab === 1">
                    <div class='setting-container'>
                        <SwitchItem :visible="darkModeVisible" icon="fa-regular fa-lightbulb" title="Chế độ sáng/tối" />
                        <SwitchItem :visible="darkModeVisible" icon="fa-solid fa-font" title="Chế độ Thu gọn" />
                    </div>
                </el-card>
                <el-card v-else-if="tab === 2">
                    <div class='notification-container'>
                        <div class="custom-style-notification">
                            <el-segmented v-model="valueNotification" :options="options" />
                        </div>
                        <div>

                        </div>
                    </div>
                </el-card>
                <el-card v-else-if="tab === 3">
                    <div class='upgrade-container'>
                        Upgrade
                    </div>
                </el-card>
            </el-col>
        </el-row>


    </div>

    <ChangePasswordModal ref='changePasswordModal' />
</template>

<style scoped>
.profile-page {
    margin-left: 50px;
}

.title {
    text-align: center;
    font-size: 25px;
}

.avatar-image-block {
    text-align: center;
}

.user-container {
    margin-left: auto;
    margin-right: auto;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.custom-btn {
    cursor: pointer;
    padding: 10px;
}

.custom-btn:hover {
    color: var(--el-color-primary);
}

div.active {
    color: var(--el-color-primary);
    background-color: var(--el-color-info-light-9);
    border-right: 3px solid var(--el-color-primary);
}

.custom-style-notification .el-segmented {
    --el-border-radius-base: 16px;
}

</style>