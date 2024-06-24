import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore('authentication', {
    state: () => ({
        userInfo: null,
        role: String,
    }),
    getters: {
        authenticated: (state) => state.userInfo != null,
    },
    actions: {
        async loadFromServer() {
            try {
                const resUser = {
                    data: {
                        role: ""
                    }
                }
                this.userInfo = resUser.data
                this.role = resUser.data.role
            } catch (e: any) {
                if (e.response && e.response.status === 401) {
                    this.userInfo = null
                }
            }
        },
        async logout() {
            try {
                this.userInfo = null
            } catch (e: any) {
                if (e.response && e.response.status === 401) {
                    this.userInfo = null
                }
            }
        },
    },
})