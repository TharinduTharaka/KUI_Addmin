import { api } from '@/store/api'

export default {

    getAllAttendanceData: async function (user_id) {
        return await api.get(`/attendance/get-attendance-by-id?user_id=${user_id}`)
    },
    getAllAttendanceByAttendanceData: async function (task_id) {
        return await api.get(`/attendance/get-attendance-by-attendance-id?id=${task_id}`)
    },
    create: async function (task_id, payload) {
        return await api.post(`/attendance/create_attendance/${task_id}`, payload)
    },
    getChildList: async function (user_id) {
        return await api.get(`/attendance/get-child-for-supervisor?supervisor=${user_id}`)
    },
    changeAttendanceStatus: async function (attendance_id, user_id, status, comment) {
        return await api.put(`/attendance/change-status-attendance/${attendance_id}/${user_id}/${status}?comment=${user_id}${comment}`)
    },
    getTodayInTime: async function (user_id) {
        return await api.get(`/attendance/get-today-in-time/${user_id}`)
    },
    getAttendanceStat: async function (user_id) {
        return await api.get(`/attendance/get-attendance-stat/${user_id}`)
    },
    getTotalTakenLeaves: async function (user_id) {
        return await api.get(`/attendance/get-total-taken-leaves/${user_id}`)
    },
    getPenaltyValue: async function (user_id) {
        return await api.get(`/attendance/get-penalty/${user_id}`)
    },



}
