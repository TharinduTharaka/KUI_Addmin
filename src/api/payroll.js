import { api } from '@/store/api'

export default {

    getBasicSalaryById: async function (user_id) {
        return await api.get(`/payroll/get-basic-salary-info-by-id/${user_id}`)
    },
    getAllowanceSalaryById: async function (user_id) {
        return await api.get(`/payroll/get-allowance-salary-info-by-id/${user_id}`)
    },
    getDeductionSalaryById: async function (user_id) {
        return await api.get(`/payroll/get-deduction-salary-info-by-id/${user_id}`)
    },
    updateSalary: async function (user_id, category, type, amount, update_user, selected_for_Addition_type, reason, effective_date) {
        return await api.post(`/payroll/update-salary-by-id/${user_id}?category=${category}&type=${type}&amount=${amount}&updated_user=${update_user}&addition_type=${selected_for_Addition_type}&reason=${reason}&effective_date=${effective_date}`)
    },
    getSalaryBreakdownForEachType: async function (id) {
        return await api.get(`/payroll/get-salary-for-each-type/${id}`)
    },
    updateEachType: async function (id, status, updated_user) {
        return await api.put(`/payroll/update-salary-for-each-type/${id}/${status}?updated_user=${updated_user}`)
    },
    updateSalaryMasterDataType: async function (category, type, updated_user) {
        return await api.post(`/payroll/update-master-salary-category?category=${category}&type=${type}&updated_user=${updated_user}`)
    },
    getSalaryMasterDataTypeByCategory: async function (category) {
        return await api.get(`/payroll/get-master-salary-type/${category}`)
    },
    getSalarySetting: async function (user_id) {
        return await api.get(`/payroll/get-master-payroll-setting/${user_id}`)
    },
    updateSalarySetting: async function (id, status) {
        return await api.put(`/payroll/update-master-payroll-setting/${id}/${status}`)
    },
    getPendingEmpList: async function (id, status) {
        return await api.get(`/payroll/get-pending-approval-list`)
    },

}
