import http from '@/services/http'
import { ConstructionAPI } from '@/constants/API'

export const getConstructionByPage = async (page: any) => {
    return (await http.get(ConstructionAPI.LIST_CONSTRUCTIONS(page))).data
}

export const getConstructionById = async (id: any) => {
    return (await http.get(ConstructionAPI.CONSTRUCTION_BY_ID(id))).data.data
}

export const createConstruction = async (payload: any) => {
    await http.post(ConstructionAPI.CREATE_CONSTRUCTION, payload)
}

export const deleteConstruction = async (constructionId: any) => {
    await http.delete(ConstructionAPI.DELETE_CONSTRUCTION(constructionId))
}

export const editConstruction = async (constructionId: any, payload: any) => {
    await http.put(ConstructionAPI.EDIT_CONSTRUCTION(constructionId), payload)
}