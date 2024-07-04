<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { createConstruction } from '@/services/construction'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const authenticationStore = useAuthenticationStore()
authenticationStore.loadFromServer()

const postForm = ref({
    username: '',
    phone: '',
    address: '',
    description: '',
})

const postFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)

const rules = reactive<FormRules>({

})
const createLoading = ref<boolean>(false)

const handleCreateConstruction = async (data: any) => {
    createLoading.value = true
    try {
        await createConstruction(data)
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
                username: postForm.value.username,
                description: postForm.value.description,
                phone: postForm.value.phone,
                address: postForm.value.address,
            }

            await handleCreateConstruction(data)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.username = ''
    form.description = ''
    form.phone = ''
    form.address = ''
}

function openModal() {
    visible.value = true
    resetForm(postForm.value)
}

onMounted(async () => {
})

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Thêm công trình' width='40%' top='8vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Tên chủ nhà:' prop='username'>
                <el-input v-model='postForm.username' placeholder='Nhập tên chủ nhà' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Số điện thoại:' prop='phone'>
                <el-input v-model='postForm.phone' placeholder='Nhập số điện thoại' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Địa chỉ:' prop='address'>
                <el-input v-model='postForm.address' placeholder='Nhập địa chỉ' type='text' spellcheck='false' clearable />
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