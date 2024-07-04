<script setup lang="ts">

import { Search } from '@element-plus/icons-vue'
import { convertDateTime } from '@/helpers/convertDateTime'
import FAIcon from '@/components/commons/FAIcon.vue'
import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { getConstructionByPage } from '@/services/construction'
import AddConstructionModal from '@/components/modals/construction/AddConstructionModal.vue'

const tableData = ref<any[]>([])
const totalData = ref<any>(0)
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const addConstructionModal = ref<InstanceType<typeof AddConstructionModal>>()
const editUserModal = ref<InstanceType<typeof EditUserModal>>()
const deleteUserModal = ref<InstanceType<typeof DeleteUserModal>>()

const handleChangePage = async (val: any) => {
    await loadTableData(val)
}

const handleSearch = async () => {
    await loadTableData(1)
}

const loadTableData = async (page: any) => {
    tableLoading.value = true
    try {
        const res = await getConstructionByPage(page)
        tableData.value = res.data
        console.log(tableData.value)
        totalData.value = res.totalData
    } catch (e) {
        console.log(e)
    } finally {
        tableLoading.value = false
    }
}

onMounted(async () => {
    loadingFullScreen()
    await loadTableData(1)
})
</script>

<template>
    <div class='title-page'>
        <h1>Quản lý Công Trình</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-tooltip effect='dark' content='Thêm công trình' placement='bottom'>
                <el-button plain type="info" @click='addConstructionModal?.openModal()'>
                    <FAIcon icon='fa-solid fa-plus' color='' class='icon-margin' />
                </el-button>
            </el-tooltip>
        </div>
        <div class='flex-grow'></div>
        <div class='right'>
            <el-input
                v-model="searchName"
                style="max-width: 600px"
                placeholder="Tìm kiếm công trình..."
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
        empty-text='Không có công trình nào'
        class='table'
        :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column fixed label='ID' prop='id' width='80' sortable :align="'center'">
            <template #default='{ row }'>
                <el-link :href="'/construction-details/' + row.id" type="primary" target="_blank">
                    <el-text truncated type="primary">{{ row.id }}</el-text>
                </el-link>
            </template>
        </el-table-column>
        <el-table-column label='Tên chủ nhà' width="180" prop='username' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.username'
                            popper-style="text-align: center">
                    <template #reference>
                        <el-text truncated> {{ row.username }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>

        <el-table-column label='Số điện thoại' width="150" prop='phone' :align="'center'">
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='150' trigger='click' :content='row.phone'
                            popper-style="text-align: center">
                    <template #reference
                    >
                        <el-text truncated> {{ row.phone }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Địa chỉ' width="250" prop='address'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='250' trigger='click' :content='row.address'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.address }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>

        <el-table-column label='Chi tiết'  prop='description'>
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
        <el-table-column label='Chủ thầu' width="100" prop='owner' :align="'center'">
            <template #default='{ row }'>
                <el-link :href="'/user-details/' + row.owner.id" type="primary" target="_blank">
                    <el-text truncated type="primary">{{ row.owner.id }}</el-text>
                </el-link>
            </template>
        </el-table-column>
        <el-table-column label='Ngày nhận' width="180" prop='registrationDate' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' trigger='click' :width='180' :content='convertDateTime(row.registrationDate)'>
                    <template #reference>
                        <el-text truncated> {{ convertDateTime(row.registrationDate) }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column fixed='right' label='Hành động' width='180' :align="'center'">
            <template v-slot='scope' #default>
                <el-tooltip effect='dark' content='Xem chi phí' placement='bottom'>
                    <el-button type='warning' size='small' plain @click='editUserModal?.openModal(scope.row)'>
                        <FAIcon icon='fa-solid fa-dollar-sign' color='' />
                    </el-button>
                </el-tooltip>
                <el-tooltip effect='dark' content='Sửa thông tin' placement='bottom'>
                    <el-button type='primary' size='small' plain @click='editUserModal?.openModal(scope.row)'>
                        <FAIcon icon='fa-regular fa-pen-to-square' color='' />
                    </el-button>
                </el-tooltip>
                <el-tooltip effect='dark' content='Xóa công trình' placement='bottom'>
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

    <AddConstructionModal ref="addConstructionModal"  :call-back="() => loadTableData(1)" />
</template>

<style scoped>
.title-page {
    text-align: center;
    font-size: 25px;
    margin-bottom: 28px;
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