<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { getUserRole } from '@/services/user'
import { createAdvance } from '@/services/advance'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const authenticationStore = useAuthenticationStore()
authenticationStore.loadFromServer()

const postForm = ref({
    note: '',
    description: '',
    responder: '',
    giver: '',
    amount: '',
})

const postFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)
const options = []

const rules = reactive<FormRules>({
    giver: [
        {
            trigger: ['blur', 'change'],
            required: true,
            message: 'Vui lòng chọn người cho ứng',
        },
    ],
    responder: [
        {
            trigger: ['blur', 'change'],
            required: true,
            message: 'Vui lòng chọn người muốn ứng',
        },
    ],
    amount: [
        {
            trigger: ['blur'],
            required: true,
            message: 'Vui lòng nhập số tiền',
        },
    ],
})
const createLoading = ref<boolean>(false)

const handleGetUser = async () => {
    try {
        const res = await getUserRole();
        res.map((item: any, index: any) => {
            options.push({
                value: `${item.id} - ${item.role}`,
                label: `${item.username} (${item.id} - ${item.role})`,
            })
        })
    } catch (e) {
        console.log(e)
        ElMessage({
            message: 'Tải người dùng thất bại',
            type: 'error',
        })
    }
}

const handleCreateAdvance = async (data: any) => {
    createLoading.value = true
    try {
        await createAdvance(data)
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
                note: postForm.value.note,
                description: postForm.value.description,
                responder: postForm.value.responder,
                giver: postForm.value.giver,
                amount: postForm.value.amount,
                ownerId: authenticationStore?.userInfo?.id,
            }

            await handleCreateAdvance(data)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.note = ''
    form.description = ''
    form.responder = ''
    form.giver = ''
    form.amount = ''
}

function openModal() {
    visible.value = true
    resetForm(postForm.value)
}

onMounted(async () => {
    await handleGetUser()
})

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Tạo khoản chi phí' width='40%' top='8vh'>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules' :hide-required-asterisk="true">
            <el-form-item label='Người cho ứng:' prop='giver'>
                <el-select v-model="postForm.giver" placeholder="Chọn người cho ứng">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="Người muốn ứng" prop="responder">
                <el-select v-model="postForm.responder" placeholder="Chọn người muốn ứng">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label='Chi tiết:' prop='description'>
                <el-input v-model='postForm.description' placeholder='Nhập chi tiết' type='textarea'
                          spellcheck='false' />
            </el-form-item>
            <el-form-item label='Số tiền:' prop='amount'>
                <el-input v-model='postForm.amount' placeholder='Nhập số tiền' type='number' spellcheck='false'>
                    <template #append>VND</template>
                </el-input>
            </el-form-item>
            <el-form-item label='Ghi chú thêm:' prop='note'>
                <el-input v-model='postForm.note' placeholder='Nhập ghi chú' type='text' spellcheck='false' clearable />
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