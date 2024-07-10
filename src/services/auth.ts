import http from '@/services/http'
import { AuthAPI } from '@/constants/API'

export const login = async (payload: any) => {
    return await http.post(AuthAPI.LOGIN, payload)
}

export const logout = async () => {
    return await http.post(AuthAPI.LOGOUT)
}

export const registerUser = async (payload: any) => {
    return await http.post(AuthAPI.REGISTER, payload)
}

export const forgotPassword = async (payload: any) => {
    return (await http.post(AuthAPI.FORGOT_PASSWORD, payload)).data
}

export const reSendConfirmation = async (payload: any) => {
    return (await http.post(AuthAPI.RESEND_CONFIRMATION, payload)).data
}

export const confirmRegistration = async (payload: any) => {
    return (await http.post(AuthAPI.CONFIRM_REGISTRATION, payload)).data
}