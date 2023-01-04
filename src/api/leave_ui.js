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

}
