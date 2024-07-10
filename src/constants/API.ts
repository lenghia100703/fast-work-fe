export const AuthAPI = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESEND_CONFIRMATION: '/auth/resend-confirmation',
    CONFIRM_REGISTRATION: '/auth/confirm-registration',
}


export const UserAPI = {
    GET_CURRENT_USER: '/user/me',
    ALL_USERS: '/user',
    LIST_USERS: (page: any) => `/user?page=${page}`,
    USER_ROLE: '/user/role',
    EDIT_USER: (userId: any) => `/user/${userId}`,
    DELETE_USER: (userId: any) => `/user/${userId}`,
    CREATE_USER: '/user',
    USER_BY_ID: (userId: any) => `/user/${userId}`,
    CHANGE_PASSWORD: (userId: any) => `/user/change-password/${userId}`,
    ID_ROLE: (id: any, role: any) => `/user/${role}/${id}` // có cả Construction và User
}

export const AdvanceAPI = {
    LIST_ADVANCES: (page: any) => `/advance?page=${page}`,
    EDIT_ADVANCE: (advanceId: any) => `/advance/${advanceId}`,
    DELETE_ADVANCE: (advanceId: any) => `/advance/${advanceId}`,
    CREATE_ADVANCE: '/advance',
    ADVANCE_BY_ID: (advanceId: any) => `/advance/${advanceId}`,
}

export const ConstructionAPI = {
    LIST_CONSTRUCTIONS: (page: any) => `/construction?page=${page}`,
    EDIT_CONSTRUCTION: (constructionId: any) => `/construction/${constructionId}`,
    DELETE_CONSTRUCTION: (constructionId: any) => `/construction/${constructionId}`,
    CREATE_CONSTRUCTION: '/construction',
    CONSTRUCTION_BY_ID: (constructionId: any) => `/construction/${constructionId}`,
}

export const ExpenseAPI = {
    LIST_EXPENSES: (page: any) => `/expense?page=${page}`,
    EDIT_EXPENSE: (expenseId: any) => `/expense/${expenseId}`,
    DELETE_EXPENSE: (expenseId: any) => `/expense/${expenseId}`,
    CREATE_EXPENSE: '/expense',
    EXPENSE_BY_ID: (expenseId: any) => `/expense/${expenseId}`,
}

