<script setup lang="ts">

import { Search } from '@element-plus/icons-vue'
import { convertDateTime } from '@/helpers/convertDateTime'
import FAIcon from '@/components/commons/FAIcon.vue'
import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { getAdvanceByPage } from '@/services/advance'
import AddAdvanceModal from '@/components/modals/advance/AddAdvanceModal.vue'
import { numberWithComas } from '@/helpers/numberWithComas'
import { getUserByIdAndRole } from '@/services/user'

const tableData = ref<any[]>([])
const totalData = ref<any>(0)
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const addAdvanceModal = ref<InstanceType<typeof AddAdvanceModal>>()
const editUserModal = ref<InstanceType<typeof EditUserModal>>()
const deleteUserModal = ref<InstanceType<typeof DeleteUserModal>>()

const handleChangePage = async (val: any) => {
    await loadTableData(val)
}

const handleSearch = async () => {
    await loadTableData(1)
}

const getUserData = async (id: any, role: any) => {
    try {
        const user = await getUserByIdAndRole(id, role)
    } catch (e) {
        console.log(e)
    }
}

const loadTableData = async (page: any) => {
    tableLoading.value = true
    try {
        const res = await getAdvanceByPage(page)

        res.data.map(async (item: any, index: any) => {
            const {giver, responder, ...req} = item
            console.log(giver, responder, req)
            const giverArr = giver.split(" - ")
            const responderArr = responder.split(" - ")
            const resGiver = await getUserByIdAndRole(giverArr[0], giverArr[1].toLowerCase())
            console.log(resGiver)
            const resResponder = await getUserByIdAndRole(responderArr[0], responderArr[1].toLowerCase())
            console.log(resResponder)
            tableData.value.push({
                ...req,
                giver: {
                    username: resGiver.username,
                    id: resGiver.id,
                    role: resGiver.role,
                },
                responder: {
                    username: resResponder.username,
                    id: resResponder.id,
                    role: resResponder.role,
                },
            })
        })
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
        <h1>Quản lý Chi Phí</h1>
    </div>
    <div class='search'>
        <div class='left'>
            <el-tooltip effect='dark' content='Thêm chi tiêu' placement='bottom'>
                <el-button plain type="info" @click='addAdvanceModal?.openModal()'>
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
        empty-text='Không có chi tiêu nào'
        class='table'
        :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column fixed label='ID' prop='id' width='80' sortable :align="'center'">
            <template #default='{ row }'>
                <el-text truncated type="primary">{{ row.id }}</el-text>
            </template>
        </el-table-column>
        <el-table-column label='Người cho ứng' width="180" prop='giver' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.giver.username'
                            popper-style="text-align: center">
                    <template #reference>
                        <el-link style="margin-top: -7px" :href="(row.giver.role === 'HOST') ? '/construction-details/' + row.giver.id : '/user-details/' + row.giver.id" type="primary" target="_blank">
                            <el-text type="primary" truncated> {{ row.giver.username }}</el-text>
                        </el-link>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Người ứng tiền' width="180" prop='responder' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.responder.username'
                            popper-style="text-align: center">
                    <template #reference
                    >
                        <el-link style="margin-top: -7px" :href="(row.responder.role === 'HOST') ? '/construction-details/' + row.responder.id : '/user-details/' + row.responder.id" type="primary" target="_blank">
                            <el-text type="primary" truncated> {{ row.responder.username }}</el-text>
                        </el-link>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Số tiền' width="180" prop='amount' :align="'center'">
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content="numberWithComas(row.amount, '.') + ' vnđ'"
                            popper-style="text-align: center">
                    <template #reference
                    >
                        <el-text truncated> {{ numberWithComas(row.amount, '.') + ' vnđ'}}</el-text>
                    </template
                    >
                </el-popover>
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
        <el-table-column label='Ghi chú thêm' width="180" prop='note' :align="'center'">
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.note'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.note }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Chủ thầu' width="180" prop='note' :align="'center'">
            <template #default='{ row }'>
                <el-popover placement='bottom' :width='200' trigger='click' :content='row.note'>
                    <template #reference
                    >
                        <el-text truncated> {{ row.note }}</el-text>
                    </template
                    >
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label='Ngày ứng' width="180" prop='advanceDate' sortable>
            <template #default='{ row }'>
                <el-popover placement='bottom' trigger='click' :width='180' :content='convertDateTime(row.advanceDate)'>
                    <template #reference>
                        <el-text truncated> {{ convertDateTime(row.advanceDate) }}</el-text>
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

    <AddAdvanceModal ref="addAdvanceModal" :call-back='() => loadTableData(1)' />
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