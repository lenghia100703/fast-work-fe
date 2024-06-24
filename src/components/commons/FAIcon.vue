<script setup lang='ts'>
import { COLORS } from '@/constants/color'
import { computed } from 'vue'

const props = withDefaults(
    defineProps<{
        customStyle?: () => Record<string, string>
        icon?: string
        title?: string
        color?: string
        size?: string
        clickable?: boolean
        disabled?: boolean
    }>(),
    {
        customStyle: () => ({}),
        icon: 'fas fa-question',
        title: '',
        color: COLORS.BLACK,
        size: 'inherit',
        clickable: true,
        disabled: false,
    },
)

const emit = defineEmits(['click'])

const cursor = computed(() =>
    props.title && props.clickable && !props.disabled ? 'pointer' : 'unset',
)
const displayColor = computed(() =>
    props.disabled ? COLORS.DISABLED : props.color + ' !important',
)
const displayTitle = computed(() =>
    props.title && props.disabled
        ? 'Bạn không có quyền thực hiện chức năng này'
        : props.title,
)
const fontSize = computed(() => props.size)

function onClick() {
    if (props.disabled) return
    emit('click')
}
</script>

<template>
    <span
        :class="`icon ${disabled ? 'disabled' : 'enabled'}`"
        @click='onClick'
        :style='{ color: displayColor, cursor, ...customStyle() }'
    >
    <el-tooltip v-if='displayTitle' placement='top' :content='displayTitle'>
      <i :class='icon' :style='{ fontSize, color: displayColor }' />
    </el-tooltip>
    <i v-else :class='icon' :style='{ fontSize, color: displayColor }' />
  </span>
</template>

<style scoped>
.icon {
    display: inline-flex;
    align-items: center;
}
</style>