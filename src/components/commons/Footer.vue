<script setup lang='ts'>

import FAIcon from '@/components/commons/FAIcon.vue'
</script>

<template>
    <div class='main-footer'>
        <div class='container-footer'>
            <el-row>
                <el-col :span='14'>
                    <p class='title'>TRUNG TÂM BẢO TỒN DI SẢN THĂNG LONG - HÀ NỘI</p>
                    <el-row :gutter='12'>
                        <el-col :span='12'>
                            <p class='info'>
                                ADD
                                <span>
                                    Số 19C Hoàng Diệu, Q. Ba Đình, TP. Hà Nội
                                </span>
                            </p>
                            <p class='info tel'>
                                TEL
                                <span>
                                    +84-24-37345427
                                </span>
                            </p>
                        </el-col>
                        <el-col :span='12'>
                            <p class='info'>
                                HOTLINE
                                <span>
                                    084 845 5222
                                </span>
                            </p>
                            <p class='info'>
                                FAX
                                <span>
                                    +84-24-37345926
                                </span>
                            </p>
                            <p class='info'>
                                EMAIL
                                <span>
                                    info@hoangthanhthanglong.vn
                                </span>
                            </p>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span='4'></el-col>
                <el-col :span='6'>
                    <el-image class='image' src='https://hoangthanhthanglong.com/store/uploads/2019/01/LOGO-HT.png' />
                    <el-image class='image' src='https://hoangthanhthanglong.com/store/uploads/2023/05/logoSaleNoti.png' />
                </el-col>
            </el-row>
        </div>
    </div>
    <div class='copyright'>
        <div class='container-copyright'>
            <el-row>
                <el-col :span='21'>
                    Trung tâm Bảo Tồn Di Sản Thăng Long - Hà Nội (Quyết định thành lập số: 3855/QĐ-UBND ngày 01/9/2006
                    của Ủy ban nhân dân Tp. Hà Nội)
                </el-col>
                <el-col :span='2'>
                    <FAIcon class='icon' size='large' icon='fa-brands fa-youtube' color='white' />
                    <FAIcon class='icon' size='large' icon='fa-brands fa-google' color='white' />
                    <FAIcon class='icon' size='large' icon='fa-brands fa-facebook' color='white' />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style scoped>
.main-footer {
    background-image: url("https://hoangthanhthanglong.com/store/themes/ks/images/fo.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding: 30px 0 24px;
    height: 238px;
    margin-top: 50px;
}

.container-footer {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    color: white;
}

.container-copyright {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    color: white;
}

.title {
    font-size: 22px;
    font-weight: bold;
}

.info {
    font-size: 13px;
    position: relative;
}

.info span {
    position: absolute;
    left: 76px;
}

.tel {
    top: 34px;
}

.image {
    width: 70%;
}

.copyright {
    background-color: #805c1d;
    padding: 10px 0;
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
}

.icon {
    margin-right: 10px;
}
</style>