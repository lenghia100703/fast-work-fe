<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

const redirectToLogin = () => {
    router.push({
        name: 'login',
    })
}
</script>

<template>
    <el-row :justify="'center'" style="margin-top: 50px">
        <el-col :span="9">
            <el-card body-style="padding-bottom: 30px">
                <template #header>
                    <div class="card-header">
                        <h1>Đăng ký tài khoản thành công</h1>
                    </div>
                </template>
                <div>
                    <el-text>
                        Đăng ký thành công. Hệ thống đã gửi một e-mail xác nhận đến địa chỉ e-mail của bạn.
                    </el-text>
                    <br>
                    <br>
                    <el-text>
                        Hãy kiểm tra hộp thư (bao gồm cả thư mục spam, quảng cáo,...) để kích hoạt tài khoản. Nếu bạn chưa
                        nhận được email, hãy click vào
                        <el-link type="primary">đây</el-link>
                        để nhận lại email kích hoạt.
                    </el-text>
                    <br>
                    <br>
                    <el-text>
                        Nếu bạn cần hỗ trợ, vui lòng gửi mail đến địa chỉ
                        <el-text type="primary">lenghia1007@gmail.com</el-text>
                        để được tư vấn hỗ trợ.
                    </el-text>
                </div>
                <br>
                <div>
                    <span class='left-dialog-footer'>
                        <el-button type="primary" link>Gửi lại mail kích hoạt</el-button>
                    </span>
                    <span class='right-dialog-footer'>
                        <el-button size="large" type="primary" @click="redirectToLogin"> Đăng nhập </el-button>
                    </span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style scoped>
.card-header {
    font-size: 19px;
    text-align: center;
}

.right-dialog-footer {
    float: right;
}

</style>