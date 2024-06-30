<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { getUserByPage } from '@/services/user'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { convertDateTime } from '@/helpers/convertDateTime'
import FAIcon from '@/components/commons/FAIcon.vue'

const tableData = ref<any[]>([])
const totalData = ref<any>(0)
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const addUserModal = ref<InstanceType<typeof AddUserModal>>()
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
        const res = await getUserByPage(page)
        tableData.value = res.data
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
        <h1>Quản lý Nhân Công</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-tooltip effect='dark' content='Thêm nhân công' placement='bottom'>
                <el-button plain type="info" @click='addUserModal?.openModal()'>
                    <FAIcon icon='fa-solid fa-plus' color='' class='icon-margin' />
                </el-button>
            </el-tooltip>
        </div>
        <div class='flex-grow'></div>
        <div class='right'>
            <el-input
                v-model="searchName"
                style="max-width: 600px"
                placeholder="Tìm nhân công..."
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
        empty-text='Không có nhân công nào'
        class='table'
        :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column fixed label='ID' prop='id' width='80' sortable :align="'center'">
            <template #default='{ row }'>
                <el-link :href="'/user-details/' + row.id" type="primary" target="_blank">
                    <el-text truncated type="primary">{{ row.id }}</el-text>
                </el-link>
            </template>
        </el-table-column>
        <el-table-column label='Họ và tên' width="180" prop='username' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.username'
                            popper-style="text-align: center">
                    <template #reference
                    >
                        <el-text truncated> {{ row.username }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Email' width="220" prop='email'>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='300' trigger='click' :content='row.email'
                            popper-style="text-align: center">
                    <template #reference
                    >
                        <el-text truncated> {{ row.email }}</el-text>
                    </template
                    >
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
        <el-table-column label='Tuổi' width="55" prop='age' :align="'center'">
            <template #default='{ row }'>
                <el-text truncated> {{ row.age }}</el-text>
            </template>
        </el-table-column>
        <el-table-column label='Ảnh đại diện' width="120" prop='avatar' :align="'center'">
            <template #default='{ row }'>
                <el-popover placement='bottom' :show-after='400' :width='300' trigger='hover'
                            popper-style="text-align: center">
                    <template #reference>
                        <el-text truncated>
                            <el-link :href='row.image' target='_blank'>{{ row.avatar }}</el-link>
                        </el-text>
                    </template>
                    <template #default>
                        <el-image style='max-width: 300px; max-height: 300px;' :src='row.avatar' alt='Image' />
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Xác nhận mail' width="130" prop='emailConfirmed' :align="'center'">
            <template #default='{ row }'>
                <el-text :type="row.emailConfirmed ? 'success' : 'danger'" truncated tag="b">
                    {{ row.emailConfirmed ? 'Đã xác nhận' : 'Chưa xác nhận' }}
                </el-text>
            </template>
        </el-table-column>
        <el-table-column label='Người tạo' width="220" prop='createdBy'>
            <template #default='{ row }'>
                <el-popover placement='bottom' trigger='click' :width='300' :content='row.createdBy'
                            popper-style="text-align: center">
                    <template #reference
                    >
                        <el-text truncated> {{ row.createdBy }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Người sửa' width="220" prop='updatedBy'>
            <template #default='{ row }'>
                <el-popover placement='bottom' trigger='click' :width='300' :content='row.updatedBy'
                            popper-style="text-align: center">
                    <template #reference
                    >
                        <el-text truncated> {{ row.updatedBy }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ngày tạo' width="180" prop='createdAt' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' trigger='click' :width='180' :content='convertDateTime(row.createdAt)'>
                    <template #reference>
                        <el-text truncated> {{ convertDateTime(row.createdAt) }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ngày sửa' width="180" prop='updatedAt' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' trigger='click' :width='180' :content='convertDateTime(row.updatedAt)'>
                    <template #reference>
                        <el-text truncated> {{ convertDateTime(row.updatedAt) }}</el-text>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column fixed='right' label='Hành động' width='130' :align="'center'">
            <template v-slot='scope' #default>
                <el-tooltip effect='dark' content='Chỉnh sửa tài khoản' placement='bottom'>
                    <el-button type='primary' size='small' plain @click='editUserModal?.openModal(scope.row)'>
                        <FAIcon icon='fa-regular fa-pen-to-square' color='' />
                    </el-button>
                </el-tooltip>
                <el-tooltip effect='dark' content='Xóa tài khoản' placement='bottom'>
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

    <AddUserModal ref='addUserModal' :call-back='() => loadTableData(1)' />
    <EditUserModal ref='editUserModal' :call-back='() => loadTableData(1)' />
    <DeleteUserModal ref='deleteUserModal' :call-back='() => loadTableData(1)' />
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