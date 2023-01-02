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



}
