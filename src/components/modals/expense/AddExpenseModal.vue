<script setup lang="ts">

import { ElForm, ElMessage, FormRules } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { createExpense } from '@/services/expense'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const postForm = ref({
    title: '',
    sellerPhone: '',
    quantity: 0,
    description: '',
    price: 0,
})

const constructionId = ref(0)

const postFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)
const rules = reactive<FormRules>({
    title: [
        {
            trigger: ['blur'],
            required: true,
            message: 'Vui lòng nhập tiêu đề',
        },
    ],
    sellerPhone: [
        {
            trigger: ['blur'],
            required: true,
            message: 'Vui lòng nhập số điện thoại người bán',
        },
    ],
    price: [
        {
            trigger: ['blur'],
            required: true,
            message: 'Vui lòng nhập đơn giá',
        },
    ],
    quantity: [
        {
            trigger: ['blur'],
            required: true,
            message: 'Vui lòng nhập số lượng',
        },
    ],
})
const createLoading = ref<boolean>(false)

const handleCreateExpense = async (data: any) => {
    createLoading.value = true
    try {
        await createExpense(data)
        await props.callBack()
        ElMessage({
            message: 'Thêm thành công',
            type: 'success',
        })
        resetForm(postForm.value)
        visible.value = false
    } catch (e) {
        console.log(e)
        ElMessage({
            message: 'Thêm thất bại',
            type: 'error',
        })
    } finally {
        createLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            const data = {
                title: postForm.value.title,
                description: postForm.value.description,
                sellerPhone: postForm.value.sellerPhone,
                quantity: postForm.value.quantity,
                price: postForm.value.price,
                constructionId: constructionId.value
            }

            await handleCreateExpense(data)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.title = ''
    form.description = ''
    form.sellerPhone = ''
    form.quantity = 0
    form.price = 0
}

function openModal(data: any) {
    visible.value = true
    resetForm(postForm.value)
    constructionId.value = data
}

onMounted(async () => {
})

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Thêm công trình' width='40%' top='8vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules' :hide-required-asterisk="true">
            <el-form-item label='Tiêu đề:' prop='title'>
                <el-input v-model='postForm.title' placeholder='Nhập tiêu đề' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Số điện thoại:' prop='sellerPhone'>
                <el-input v-model='postForm.sellerPhone' placeholder='Nhập số điện thoại' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Đơn giá:' prop='price'>
                <el-input v-model='postForm.price' placeholder='Nhập đơn giá' type='number' spellcheck='false' clearable >
                    <template #append>VND</template>
                </el-input>
            </el-form-item>
            <el-form-item label='Số lượng:' prop='quantity'>
                <el-input v-model='postForm.quantity' placeholder='Nhập số lượng' type='number' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Chi tiết:' prop='description'>
                <el-input v-model='postForm.description' placeholder='Nhập chi tiết' type='textarea'
                          spellcheck='false' />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class='left-dialog-footer'>
                <el-button @click='resetForm(postForm)'>Thiết lập lại</el-button>
            </span>
            <span class='right-dialog-footer'>
                <el-button @click='visible = false'>Huỷ bỏ</el-button>
                <el-button type='primary' :loading='createLoading' @click='submitForm(postFormRef)'>
                    Tạo mới
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.left-dialog-footer {
    float: left;
}


.left-dialog-footer {
    float: left;
}

label {
    padding: 32px 43px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    background-color: white;
    color: #8c939d;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    position: absolute;
    z-index: 2;
}
</style>