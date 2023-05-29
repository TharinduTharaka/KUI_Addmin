import { api } from '@/store/api'

export default {

  getData: async function (id) {
    return await api.get(`leave/get_leave_by_id/${id}`)
  },
  getLeaveBalance: async function (id) {
    return await api.get(`leave/get_available_leaves/${id}`)
  },
  create: async function (id,payload) {
    return await api.post(`leave/create_leave/${id}`, payload)
  },
  getChildList: async function (user_id) {
    return await api.get(`leave/get-child-for-supervisor?supervisor=${user_id}`)
  },
  updateStatus: async function (task, status, user) {
    return await api.put(`leave/update-status/${task}/${status}/${user}`)
  },
  getChildListAttendance: async function (user_id) {
    return await api.get(`attendance/get-child-for-supervisor?supervisor=${user_id}`)
  },
  getMinorStaffList: async function (user_id) {
    return await api.get(`attendance/get-minor-staff-list?supervisor=${user_id}`)
  },
  getAllAttendanceDataForApproval: async function (user_id, date) {
    return await api.get(`/attendance/get-attendance-by-id-for-approval?user_id=${user_id}&date=${date}`)
  },
  updateAttendanceStatus: async function (id, status, date) {
    return await api.put(`/attendance/update-status/${id}/${status}/${date}`)
  },
  updateAttendanceStatusForReviewRequest: async function (id, status, date) {
    return await api.put(`/attendance/update-status-for-request-issue/${id}/${status}/${date}`)
  },

}
