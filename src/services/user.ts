import http from '@/services/http'
import { UserAPI } from '@/constants/API'
import httpFile from '@/services/httpFile'

export const getCurrentUser = async () => {
    return (await http.get(UserAPI.GET_CURRENT_USER)).data
}

export const getUserByPage = async (page: any) => {
    return (await http.get(UserAPI.LIST_USERS(page))).data
}

export const getUserById = async (id: any) => {
    return (await http.get(UserAPI.USER_BY_ID(id))).data.data
}

export const createUser = async (payload: any) => {
    await http.post(UserAPI.CREATE_USER, payload)
}

export const deleteUser = async (userId: any) => {
    await http.delete(UserAPI.DELETE_USER(userId))
}

export const editUser = async (userId: any, payload: any) => {
    await httpFile.put(UserAPI.EDIT_USER(userId), payload)
}

export const changePassword = async (userId: any, payload: any) => {
    await http.put(UserAPI.CHANGE_PASSWORD(userId), payload)
}