import { createRouter, createWebHistory } from 'vue-router'
import { PATHS } from '@/router/paths'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import NotAuthenticationLayout from '@/layouts/NotAuthenticationLayout.vue'
import LoginView from '@/views/commons/LoginView.vue'
import RegisterView from '@/views/commons/RegisterView.vue'
import ProfileView from '@/views/commons/ProfileView.vue'
import HomeView from '@/views/commons/HomeView.vue'
import SettingView from '@/views/commons/SettingView.vue'
import ManageConstructionView from '@/views/owner/ManageConstructionView.vue'
import ManageEmployeeView from '@/views/owner/ManageEmployeeView.vue'
import UserDetailsView from '@/views/commons/UserDetailsView.vue'
import ManageMoneyView from '@/views/owner/ManageMoneyView.vue'
import ConstructionDetailsView from '@/views/commons/ConstructionDetailsView.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import NotConfirmLayout from '@/layouts/NotConfirmLayout.vue'
import ConfirmRegisterView from '@/views/commons/ConfirmRegisterView.vue'
import ProcessTokenFormMailView from '@/views/commons/ProcessTokenFormMailView.vue'
import ResendConfirmationView from '@/views/commons/ResendConfirmationView.vue'
import ForgotPasswordView from '@/views/commons/ForgotPasswordView.vue'

const router = createRouter({
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
                    path: PATHS.CONSTRUCTION_DETAILS,
                    component: ConstructionDetailsView,
                    name: 'construction-details',
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
                    meta: { requiresAuth: true, role: 'OWNER' }
                },
                {
                    path: PATHS.MANAGE_EMPLOYEE,
                    component: ManageEmployeeView,
                    name: 'manage-employee',
                    meta: { requiresAuth: true, role: 'OWNER' }
                },
                {
                    path: PATHS.MANAGE_EXPENSE,
                    component: ManageMoneyView,
                    name: 'manage-expense',
                    meta: { requiresAuth: true, role: 'OWNER' }
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
                    name: 'login',
                },
                {
                    path: PATHS.REGISTER,
                    component: RegisterView,
                    name: 'register',
                },
            ],
        },

        {
            path: PATHS.HOME,
            component: NotConfirmLayout,
            children: [
                {
                    path: PATHS.CONFIRM_REGISTER,
                    component: ConfirmRegisterView,
                    name: 'confirm-register',
                },
                {
                    path: PATHS.CONFIRM_REGISTRATION,
                    component: ProcessTokenFormMailView,
                    name: 'confirm-registration',
                },
                {
                    path: PATHS.RESEND_CONFIRMATION,
                    component: ResendConfirmationView,
                    name: 'resend-confirmation',
                },
                {
                    path: PATHS.FORGOT_PASSWORD,
                    component: ForgotPasswordView,
                    name: 'forgot-password',
                },
            ]
        }
    ],
})

router.beforeEach(async (to, from, next) => {
    const authenticationStore = useAuthenticationStore()
    await authenticationStore.loadFromServer()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const userRole = authenticationStore.role

    if (requiresAuth && !authenticationStore.authenticated) {
        next({ name: 'login' })
    } else if (requiresAuth && to.meta.role && to.meta.role !== userRole) {
        next({ name: 'home' })
    } else if ((to.name === 'login' || to.name === 'register') && authenticationStore.authenticated) {
        next({ name: 'home' })
    } else {
        next()
    }
})

export { router }