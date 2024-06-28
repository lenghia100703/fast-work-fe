import { createRouter, createWebHistory } from 'vue-router'
import { PATHS } from '@/router/paths'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import NotAuthenticationLayout from '@/layouts/NotAuthenticationLayout.vue'
import LoginView from '@/views/commons/LoginView.vue'
import RegisterView from '@/views/commons/RegisterView.vue'
import ProfileView from '@/views/commons/ProfileView.vue'
import HomeView from '@/views/commons/HomeView.vue'
import SettingView from '../views/commons/SettingView.vue'
import ManageConstructionView from '../views/owner/ManageConstructionView.vue'
import ManageEmployeeView from '../views/owner/ManageEmployeeView.vue'
import UserDetailsView from '../views/commons/UserDetailsView.vue'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: PATHS.HOME,
            component: DefaultLayout,
            children: [
                {
                    path: PATHS.HOME,
                    component: HomeView,
                    name: 'home',
                },
                {
                    path: PATHS.PROFILE,
                    component: ProfileView,
                    name: 'profile',
                },
                {
                    path: PATHS.USER_DETAILS,
                    component: UserDetailsView,
                    name: 'user-details',
                },
                {
                    path: PATHS.SETTING,
                    component: SettingView,
                    name: 'setting',
                },
                {
                    path: PATHS.MANAGE_CONSTRUCTION,
                    component: ManageConstructionView,
                    name: 'manage-construction',
                },
                {
                    path: PATHS.MANAGE_EMPLOYEE,
                    component: ManageEmployeeView,
                    name: 'manage-employee',
                },
            ],
        },

        {
            path: PATHS.HOME,
            component: NotAuthenticationLayout,
            children: [
                {
                    path: PATHS.LOGIN,
                    component: LoginView,
                    name: 'login'
                },
                {
                    path: PATHS.REGISTER,
                    component: RegisterView,
                    name: 'register'
                },
            ],
        },
    ]
})