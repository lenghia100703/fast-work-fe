<script setup lang="ts">
import { useRoute } from 'vue-router'
import { PROVIDERS } from '@/constants/provider'
import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { getUserById } from '@/services/user'
import FAIcon from '@/components/commons/FAIcon.vue'
import { formatPhoneNumber } from '@/helpers/formatPhoneNumber'

const route = useRoute()
const id = route.params.id
const userDetailInfo = ref()
const phone = ref('')

const iconCustomStyle = () => ({
    margin: '0 10px 0 0',
})

const loadUserDetail = async () => {
    try {
        userDetailInfo.value = await getUserById(id)
        phone.value = userDetailInfo.value.phone
    } catch (e) {
        console.error(e)
    }
}

onMounted(async () => {
    loadingFullScreen()
    await loadUserDetail()
})
</script>

<template>
    <div class="user-details-container">
        <div class="user-details-header">
            <div class="container background-div">
                <el-image
                    z-index="10"
                    class="background-image"
                    src="https://fullstack.edu.vn/assets/cover-profile-CDYcrPwJ.png"
                />
                <div class="avatar-div">
                    <el-image
                        z-index="20"
                        class='avatar-image'
                        :src='userDetailInfo?.avatar'
                    />
                    <div class="info">
                        <el-row>
                            <el-text tag="b" style="font-size: 25px">{{ userDetailInfo?.username }}</el-text>
                        </el-row>
                        <el-row>
                            <el-text style="font-size: 14px">{{ userDetailInfo?.email }}</el-text>
                        </el-row>
                    </div>
                </div>

            </div>
        </div>

        <div class="user-details-content">
            <el-card shadow="never" body-style="padding: 0">
                <el-tabs type="border-card" tab-position="left" style="height: 200px" class="demo-tabs">
                    <el-tab-pane label="Tổng quan">
                        <el-row class="row-info">
                            <el-text size="large">
                                <FAIcon :custom-style="iconCustomStyle" icon="fa-solid fa-house-chimney-window"
                                        color="" />
                                Sống tại
                                <el-text tag="b" size="large">{{ userDetailInfo?.address }}</el-text>
                            </el-text>
                        </el-row>

                        <el-row class="row-info">
                            <el-text size="large">
                                <FAIcon :custom-style="iconCustomStyle" icon="fa-solid fa-phone" color="" />
                                Di động
                                <el-text tag="b" size="large">{{ formatPhoneNumber(phone) }}</el-text>
                            </el-text>
                        </el-row>

                        <el-row class="row-info">
                            <el-text size="large">
                                <FAIcon :custom-style="iconCustomStyle" icon="fa-solid fa-cake-candles" color="" />
                                Tuổi
                                <el-text tag="b" size="large">{{ userDetailInfo?.age }}</el-text>
                            </el-text>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Số công">Config</el-tab-pane>
                    <el-tab-pane label="Tạm ứng">Role</el-tab-pane>
                    <el-tab-pane label="Tài khoản">
                        <el-row class="row-info">
                            <el-text size="large">
                                <FAIcon :custom-style="iconCustomStyle" icon="fa-solid fa-user-tag" color="" />
                                Vai trò:
                                <el-text tag="b" type="success" size="large">{{ userDetailInfo?.role }}</el-text>
                            </el-text>
                        </el-row>
                        <el-row class="row-info">
                            <el-text size="large">
                                <FAIcon icon="fa-regular fa-circle-check" :custom-style="iconCustomStyle" color="" />
                                Xác thực mail:
                                <el-text :type="userDetailInfo?.emailConfirmed ? 'success' : 'danger'" size="large"
                                         tag="b">
                                    {{ userDetailInfo?.emailConfirmed ? 'Đã xác nhận' : 'Chưa xác nhận' }}
                                </el-text>
                            </el-text>
                        </el-row>
                        <el-row class="row-info">
                            <el-text size="large">
                                <FAIcon :custom-style="iconCustomStyle" icon="fa-regular fa-registered" color="" />
                                Nền tảng đăng ký:
                                <el-text class='user-info-detail' type='info' tag="b" size="large"
                                         v-if="userDetailInfo?.provider === PROVIDERS.LOCAL">
                                    {{ userDetailInfo?.provider }}
                                </el-text>
                                <el-text class='user-info-detail' type='warning' tag="b" size="large"
                                         v-else-if="userDetailInfo?.provider === PROVIDERS.GOOGLE">
                                    {{ userDetailInfo?.provider }}
                                </el-text>
                                <el-text class='user-info-detail' type='primary' tag="b" size="large"
                                         v-else-if="userDetailInfo?.provider === PROVIDERS.FACEBOOK">
                                    {{ userDetailInfo?.provider }}
                                </el-text>
                            </el-text>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
}

.user-details-container {
    width: 100%;
}

.user-details-header {
    width: 100%;
}

.user-details-content {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}

.background-div {
    margin-top: -50px;
}

.background-image {
    border-radius: 16px;
    width: 100%;
}

.avatar-div {
    width: 160px;
    height: 160px;
    margin-top: -50px;
    margin-left: 50px;
    border-radius: 50%;
    background-color: white;
    position: relative;
    z-index: 15;
}

.avatar-image {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.info {
    width: 150%;
    display: block;
    position: absolute;
    left: 110%;
    top: 50%;
    transform: translateY(-50%);
}

.demo-tabs {
    border-radius: var(--el-border-radius-base);
}

.row-info + .row-info {
    margin-top: 10px;
}
</style>