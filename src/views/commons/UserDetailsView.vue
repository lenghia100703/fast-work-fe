<script setup lang="ts">
import { useRoute } from 'vue-router'
import { PROVIDERS } from '@/constants/provider'
import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { getUserById } from '@/services/user'
import { ElForm } from 'element-plus'
import FAIcon from '@/components/commons/FAIcon.vue'

const route = useRoute()
const id = route.params.id
const userDetailInfo = ref()

const iconCustomStyle = () => ({
    margin: '0 10px 0 0'
});

const loadUserDetail = async () => {
    try {
        userDetailInfo.value = await getUserById(id)
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
                        src='https://avatars.githubusercontent.com/u/100254753?v=4'
                    />
                    <div class="info">
                        <el-row>
                            <el-text tag="b" style="font-size: 25px">Lê Nghĩa</el-text>
                        </el-row>
                        <el-row>
                            <el-text  style="font-size: 14px">lenghia1007@gmail.com</el-text>
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
                                <FAIcon :custom-style="iconCustomStyle" icon="fa-solid fa-house-chimney-window" color="" />
                                Sống tại {{ userDetailInfo?.address }}
                            </el-text>
                        </el-row>

                        <el-row class="row-info">
                            <el-text size="large">
                                <FAIcon :custom-style="iconCustomStyle" icon="fa-solid fa-phone" color="" />
                                Di động {{ userDetailInfo?.phone }}
                            </el-text>
                        </el-row>

                        <el-row class="row-info">
                            <el-text size="large">
                                <FAIcon :custom-style="iconCustomStyle" icon="fa-solid fa-cake-candles" color="" />
                                Tuổi {{ userDetailInfo?.age }}
                            </el-text>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Số công">Config</el-tab-pane>
                    <el-tab-pane label="Tạm ứng">Role</el-tab-pane>
                    <el-tab-pane label="Tài khoản">
                        <el-form
                            label-position='left'
                            label-width='150px'>
                            <el-form-item label='Vai trò' prop='role'>
                                <el-text class='user-info-detail' type='success' tag="b">
                                    {{ userDetailInfo?.role }}
                                </el-text>
                            </el-form-item>
                            <el-form-item label='Nền tảng đăng ký' prop='provider'>
                                <el-text class='user-info-detail' type='info' tag="b"
                                         v-if="userDetailInfo?.provider === PROVIDERS.LOCAL">
                                    {{ userDetailInfo?.provider }}
                                </el-text>
                                <el-text class='user-info-detail' type='warning' tag="b"
                                         v-else-if="userDetailInfo?.provider === PROVIDERS.GOOGLE">
                                    {{ userDetailInfo?.provider }}
                                </el-text>
                                <el-text class='user-info-detail' type='primary' tag="b"
                                         v-else-if="userDetailInfo?.provider === PROVIDERS.FACEBOOK">
                                    {{ userDetailInfo?.provider }}
                                </el-text>
                            </el-form-item>
                        </el-form>
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