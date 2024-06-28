<script setup lang="ts">

import FAIcon from '@/components/commons/FAIcon.vue'
import { ref, watch } from 'vue'

const iconCustomStyle = () => ({
    margin: '0 10px 0 0'
});

const props = withDefaults(
    defineProps<{
        visible: boolean,
        onColor?: string,
        offColor?: string,
        icon?: string,
        title?: string
    }>(),
    {
        visible: false,
        onColor: 'black',
        offColor: '#dcdfe6',
        icon: 'fa-regular fa-lightbulb',
        title: ''
    },
)

const emit = defineEmits(['update:visible'])

const localVisible = ref(props.visible)

watch(localVisible, (newValue: any) => {
    emit('update:visible', newValue)
})

</script>

<template>
    <div :class="['switch-container', { inactive: !localVisible }]">
        <el-row justify="space-between" align="middle">
            <el-col :span='8'>
                <FAIcon :icon="props.icon" color="" size="large" :custom-style='iconCustomStyle' />
                <span>{{ props.title }}</span>
            </el-col>
            <el-col :span="8">
                <el-switch
                    :style="{
                        'float': 'right',
                        '--el-switch-on-color': props.onColor,
                        '--el-switch-off-color': props.offColor
                    }"
                    v-model="localVisible"
                />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.switch-container {
    border-radius: var(--el-border-radius-base);
    border: var(--el-border);
    border-color: var(--el-button-border-color);
    padding: 6px 10px;
}


</style>

<style>
.inactive {
    color: var(--el-text-color-placeholder) !important;
    background-color: var(--el-fill-color-blank) !important;
    border-color: var(--el-border-color-light) !important;
}

.switch-container + .switch-container {
    margin-top: 20px;
}
</style>