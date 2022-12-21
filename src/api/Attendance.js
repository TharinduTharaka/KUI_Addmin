import { api } from '@/store/api'

export default {

    getAllAttendanceData: async function (user_id) {
        return await api.get(`/attendance/get-all-attendance`)
    },



}
