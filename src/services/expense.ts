import http from '@/services/http'
import { ExpenseAPI } from '@/constants/API'

export const getExpenseByPage = async (page: any) => {
    return (await http.get(ExpenseAPI.LIST_EXPENSES(page))).data
}

export const getExpenseById = async (id: any) => {
    return (await http.get(ExpenseAPI.EXPENSE_BY_ID(id))).data.data
}

export const createExpense = async (payload: any) => {
    await http.post(ExpenseAPI.CREATE_EXPENSE, payload)
}

export const deleteExpense = async (expenseId: any) => {
    await http.delete(ExpenseAPI.DELETE_EXPENSE(expenseId))
}

export const editExpense = async (expenseId: any, payload: any) => {
    await http.put(ExpenseAPI.EDIT_EXPENSE(expenseId), payload)
}