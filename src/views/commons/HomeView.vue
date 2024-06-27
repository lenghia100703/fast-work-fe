<script setup lang='ts'>

import FAIcon from '@/components/commons/FAIcon.vue'
import { onMounted, reactive, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'

const iconCustomStyle = () => ({
    margin: '0 0 0 8px'
});

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());

function getDaysInMonth(year: number, month: number) {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();


    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push({ date: null, number: '', notes: '' });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push({ date: new Date(year, month, i), number: i, notes: '' });
    }

    return days;
}

const days = reactive(getDaysInMonth(currentYear.value, currentMonth.value));

function prevMonth() {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value -= 1;
    } else {
        currentMonth.value -= 1;
    }
    updateDays();
}

function nextMonth() {
    if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value += 1;
    } else {
        currentMonth.value += 1;
    }
    updateDays();
}

function updateDays() {
    const newDays = getDaysInMonth(currentYear.value, currentMonth.value);
    days.splice(0, days.length, ...newDays);
}

function isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

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
            <div class="calendar-header">
                <button @click="prevMonth">Tháng trước</button>
                <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
                <button @click="nextMonth">Tháng sau</button>
            </div>
            <div class="days-of-week">
                <span v-for="day in daysOfWeek" :key="day">{{ day }}</span>
            </div>
            <div class="days-grid">
                <div
                    v-for="day in getDaysInMonth(currentYear, currentMonth)"
                    :key="day.date"
                    :class="['day', { 'current-day': isToday(day.date) }]"
                >
                    <span>{{ day.number }}</span>
                </div>
            </div>
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