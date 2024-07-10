<script setup lang="ts">

import { useRoute } from 'vue-router'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { editConstruction, getConstructionById } from '@/services/construction'
import { convertDateTime } from '@/helpers/convertDateTime'
import { numberWithComas } from '@/helpers/numberWithComas'
import FAIcon from '@/components/commons/FAIcon.vue'
import { formatPhoneNumber } from '@/helpers/formatPhoneNumber'
import { getExpenseByPage } from '@/services/expense'
import { Search } from '@element-plus/icons-vue'
import AddExpenseModal from '@/components/modals/expense/AddExpenseModal.vue'

const route = useRoute()
const tab = ref(0)

const handleChangeTab = async (value: any) => {
    tab.value = value
    if (tab.value === 0) {
        await loadConstructionDetails()
    } else if (tab.value === 1) {
        await loadTableData(1)
    }
}

watch(
    () => route.query.tab,
    (newTab) => {
        if (newTab !== undefined) {
            handleChangeTab(Number(newTab))
        }
    }
)

const addExpenseModal = ref<InstanceType<typeof AddExpenseModal>>()
const tableData = ref<any[]>([])
const totalData = ref<any>(0)
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')
const form = ref({
    username: '',
    phone: '',
    address: '',
    description: '',
    registrationDate: Date,
    owner: {
        username: '',
        id: ''
    }
})
const constructionData = ref()
const editLoading = ref(false)
const editFormRef = ref<typeof ElForm | null>(null)
const id = route.params.id
const ownerUser = computed(() => `${form.value.owner.username} (${form.value.owner.id})`)
const validateRegistrationDate = computed(() => convertDateTime(form.value.registrationDate))

const rules = reactive<FormRules>({
    phone: [
        {
            required: true,
            message: 'Vui lòng nhập số điện thoại',
            trigger: 'blur',
        },
    ],
})

const handleChangePage = async (val: any) => {
    await loadTableData(val)
}

const handleSearch = async () => {
    await loadTableData(1)
}

const loadConstructionDetails = async () => {
    try {
        const res = await getConstructionById(id)
        form.value = JSON.parse(JSON.stringify(res))
        constructionData.value = res
    } catch (e) {
        console.error(e)
    }
}

const loadTableData = async (page: any) => {
    tableLoading.value = true
    try {
        const res = await getExpenseByPage(page)
        tableData.value = res.data
        totalData.value = res.totalData
    } catch (e) {
        console.log(e)
    } finally {
        tableLoading.value = false
    }
}

const handleSubmit = async (data: any) => {
    editLoading.value = true
    try {
        await editConstruction(id, data)
        ElMessage({
            type: 'success',
            message: 'Sửa thành công',
        })
    } catch (e) {
        console.log(e)
        ElMessage({
            type: 'error',
            message: 'Sửa thất bại',
        })
    } finally {
        editLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            const formData = new FormData()
            formData.append('description', form.value.description)
            formData.append('username', form.value.username)
            formData.append('phone', form.value.phone)
            formData.append('address', form.value.address)
            await handleSubmit(formData)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.username = constructionData.value.username
    form.phone = constructionData.value.phone
    form.address = constructionData.value.address
    form.description = constructionData.value.description
}



onMounted(async () => {
    await loadConstructionDetails()
    loadingFullScreen()
    if (route.query.tab) {
        handleChangeTab(Number(route.query.tab))
    }
})

</script>

<template>
    <div class='profile-page'>
        <h1 class="title">Chi Tiết Công Trình</h1>
        <br />
        <el-row justify="space-evenly">
            <el-col :span="5">
                <el-card body-style="padding: 20px 0 20px 0">
                    <div class="button-group">
                        <div
                            :class="{ active: tab === 0 }"
                            @click="handleChangeTab(0)"
                            class="custom-btn"
                        >Thông tin cơ bản</div>
                        <div
                            :class="{ active: tab === 1 }"
                            @click="handleChangeTab(1)"
                            class="custom-btn"
                        >Chi phí thi công</div>
                        <div
                            :class="{ active: tab === 2 }"
                            @click="handleChangeTab(2)"
                            class="custom-btn"
                        >Thông báo</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-card v-if="tab === 0">
                    <div class='user-container'>
                        <div class='user-info-detail'>
                            <el-form
                                label-position='left'
                                label-width='150px'
                                :model='form'
                                :rules='rules'
                                style='max-width: 600px; margin-left: auto; margin-right: auto;'
                                ref='editFormRef'
                                :hide-required-asterisk='true'
                            >

                                <el-form-item label='Tên chủ nhà' prop='username'>
                                    <el-input v-model='form.username' type='text' placeholder='Nhập tên chủ nhà' clearable
                                              spellcheck='false' />
                                </el-form-item>

                                <el-form-item label='Số điện thoại' prop='phone'>
                                    <el-input v-model='form.phone' type='text' placeholder='Nhập số điện thoại' clearable
                                              spellcheck='false' />
                                </el-form-item>

                                <el-form-item label='Địa chỉ' prop='address'>
                                    <el-input v-model='form.address' type='text' placeholder='Nhập địa chỉ' clearable
                                              spellcheck='false' />
                                </el-form-item>

                                <el-form-item label='Chủ thầu' prop='owner'>
                                    <el-input v-model='ownerUser' disabled type='text'
                                              spellcheck='false' />
                                </el-form-item>

                                <el-form-item label='Thời gian nhận' prop='owner'>
                                    <el-input v-model='validateRegistrationDate' disabled type='text'
                                              spellcheck='false' />
                                </el-form-item>

                                <el-form-item label='Chi tiết' prop='description'>
                                    <el-input v-model='form.description' type='textarea' placeholder='Nhập chi tiết' clearable
                                              spellcheck='false' />
                                </el-form-item>

                                <el-form-item>
                                    <el-button type='primary' @click='submitForm(editFormRef)' :loading='editLoading'>
                                        Lưu lại
                                    </el-button>
                                    <el-button @click='resetForm(form)'>
                                        Thiết lập lại
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </el-card>
                <el-card v-else-if="tab === 1">
                    <div class='search'>
                        <div class='left'>
                            <el-tooltip effect='dark' content='Thêm chi phí' placement='bottom'>
                                <el-button plain type="info" @click='addExpenseModal?.openModal(id)'>
                                    <FAIcon icon='fa-solid fa-plus' color='' class='icon-margin' />
                                </el-button>
                            </el-tooltip>
                        </div>
                        <div class='flex-grow'></div>
                        <div class='right'>
                            <el-input
                                v-model="searchName"
                                style="max-width: 600px"
                                placeholder="Tìm kiếm..."
                                class="input-with-select"
                            >
                                <template #append>
                                    <el-button :icon="Search" :loading='searchLoading' @click='handleSearch' />
                                </template>
                            </el-input>
                        </div>
                    </div>
                    <el-table
                        :data='tableData'
                        v-loading='tableLoading'
                        :border='true'
                        empty-text='Không có chi phí nào'
                        class='table'
                        :default-sort="{ prop: 'id', order: 'ascending' }"
                    >
                        <el-table-column fixed label='ID' prop='id' width='80' sortable :align="'center'">
                            <template #default='{ row }'>
                                <el-text truncated type="primary">{{ row.id }}</el-text>
                            </template>
                        </el-table-column>
                        <el-table-column label='Tiêu đề' width="180" prop='title'>
                            <template #default='{ row }'>
                                <el-popover placement='bottom' :width='200' trigger='click' :content='row.title'
                                            popper-style="text-align: center">
                                    <template #reference>
                                        <el-text truncated> {{ row.title }}</el-text>
                                    </template>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label='Số lượng' width="120" prop='quantity' sortable align="center">
                            <template #default='{ row }'>
                                <el-text truncated> {{ row.quantity }}</el-text>
                            </template>
                        </el-table-column>
                        <el-table-column label='Giá' width="180" prop='price' :align="'center'">
                            <template #default='{ row }'>
                                <el-text truncated> {{ numberWithComas(row.price, '.') + ' vnđ' }}</el-text>
                            </template>
                        </el-table-column>
                        <el-table-column label='Tổng tiền' width="180" prop='totalPrice' align="center" sortable>
                            <template #default='{ row }'>
                                <el-popover placement='bottom' :width='200' trigger='click' :content="numberWithComas(row.totalPrice, '.') + ' vnđ'"
                                            popper-style="text-align: center"
                                >
                                    <template #reference
                                    >
                                        <el-text truncated> {{ numberWithComas(row.price, '.') + ' vnđ' }}</el-text>
                                    </template
                                    >
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label='Điện thoại đối tác' width="200" prop='sellerPhone' :align="'center'">
                            <template #default='{ row }'>
                                <el-text truncated> {{ formatPhoneNumber(row.sellerPhone) }}</el-text>
                            </template>
                        </el-table-column>
                        <el-table-column label='Chi tiết' width="250" prop='description'>
                            <template #default='{ row }'>
                                <el-popover placement='bottom' :width='250' trigger='click' :content='row.description'>
                                    <template #reference
                                    >
                                        <el-text truncated> {{ row.description }}</el-text>
                                    </template
                                    >
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label='Ngày mua' width="180" prop='purchaseDate' sortable>
                            <template #default='{ row }'>
                                <el-popover placement='bottom' trigger='click' :width='180' :content='convertDateTime(row.purchaseDate)'>
                                    <template #reference>
                                        <el-text truncated> {{ convertDateTime(row.purchaseDate) }}</el-text>
                                    </template>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column fixed='right' label='Hành động' width='130' :align="'center'">
                            <template v-slot='scope' #default>
                                <el-tooltip effect='dark' content='Chỉnh sửa' placement='bottom'>
                                    <el-button type='primary' size='small' plain @click='editUserModal?.openModal(scope.row)'>
                                        <FAIcon icon='fa-regular fa-pen-to-square' color='' />
                                    </el-button>
                                </el-tooltip>
                                <el-tooltip effect='dark' content='Xóa' placement='bottom'>
                                    <el-button type='danger' size='small' @click='deleteUserModal?.openModal(scope.row)' plain>
                                        <FAIcon icon='fa-regular fa-trash-can' color='' />
                                    </el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class='pagination'>
                        <el-pagination
                            :page-size='8'
                            layout='prev, pager, next'
                            :total='totalData'
                            @current-change='handleChangePage'
                        />
                    </div>
                </el-card>
                <el-card v-else-if="tab === 2">

                </el-card>
            </el-col>
        </el-row>
    </div>

    <AddExpenseModal ref="addExpenseModal"  :call-back="() => loadTableData(1)"/>
</template>

<style scoped>
.title {
    text-align: center;
    font-size: 25px;
}

.avatar-image-block {
    text-align: center;
}

.user-container {
    margin-left: auto;
    margin-right: auto;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.custom-btn {
    cursor: pointer;
    padding: 10px;
}

.custom-btn:hover {
    color: var(--el-color-primary);
}

div.active {
    color: var(--el-color-primary);
    background-color: var(--el-color-info-light-9);
    border-right: 3px solid var(--el-color-primary);
}

.custom-style-notification .el-segmented {
    --el-border-radius-base: 16px;
}

.search {
    display: flex;
    margin-bottom: 20px;
}

.left {
    display: flex;
    float: left;
}

.right {
    display: flex;
    float: right;
}

.flex-grow {
    flex-grow: 1;
}

.pagination {
    float: right;
}
</style>