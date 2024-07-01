import http from '@/services/http'
import { AdvanceAPI } from '@/constants/API'

export const getAdvanceByPage = async (page: any) => {
    return (await http.get(AdvanceAPI.LIST_ADVANCES(page))).data
}

export const getAdvanceById = async (id: any) => {
    return (await http.get(AdvanceAPI.ADVANCE_BY_ID(id))).data.data
}

export const createAdvance = async (payload: any) => {
    await http.post(AdvanceAPI.CREATE_ADVANCE, payload)
}

export const deleteAdvance = async (userId: any) => {
    await http.delete(AdvanceAPI.DELETE_ADVANCE(userId))
}

export const editAdvance = async (userId: any, payload: any) => {
    await http.put(AdvanceAPI.EDIT_ADVANCE(userId), payload)
}