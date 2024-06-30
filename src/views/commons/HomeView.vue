<script setup lang='ts'>

import FAIcon from '@/components/commons/FAIcon.vue'
import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import vi from 'element-plus/dist/locale/vi.mjs'

const iconCustomStyle = () => ({
    margin: '0 0 0 8px',
})

const today = ref(new Date())

onMounted(() => {
    loadingFullScreen()
})
</script>

<template>
    <div class='section'>
        <h5 class="card-title">
            <div>
                <FAIcon size='large' icon='fa-solid fa-calendar-days' color='' :custom-style='iconCustomStyle' />
                Lịch
            </div>
            <div class='flex-grow'></div>
            <div>
                <el-link type='primary' href='/manage-course' class='view-all'>
                    Xem chi tiết
                    <FAIcon icon='fa-solid fa-arrow-right' color='' :custom-style='iconCustomStyle' />
                </el-link>
            </div>
        </h5>
        <div class="calendar-container">
            <el-config-provider :locale="vi">
                <el-calendar v-model="today" />
            </el-config-provider>
        </div>
    </div>
</template>

<style scoped>
.card-title {
    display: flex;
    padding: 0 0 10px 0 !important;
    font-size: 1.23em;
    line-height: 2rem;
    margin-top: 0;
    margin-bottom: 10px !important;
}

.section {
    border-color: #004683;
    border-width: 3px 0 0;
    border-style: solid;
    margin-top: 30px;
}

.view-all {
    margin-top: -4px;
    font-size: 18px;
}

.flex-grow {
    flex-grow: 1;
}

.calendar-container {
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.days-of-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
}

.days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
}

.day {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
}

.current-day {
    background-color: #ffeb3b;
}

textarea {
    margin-top: 5px;
    flex-grow: 1;
    resize: none;
    border: none;
    outline: none;
}
</style>