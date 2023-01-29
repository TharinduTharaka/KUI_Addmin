import { api } from '@/store/api'

export default {

  createRoster: async function (user, payload) {
    return await api.post(`roster/create_roster/${user}`, payload)
  },
  getRoster: async function (user,config) {
    return await api.get(`roster/get-my-roster/${user}/${config}`)
  },
  getRosterUserList: async function (user, type) {
    return await api.get(`roster/get-user-list/${type}/${user}`)
  },
  getRosterForTable: async function (user, status) {
    return await api.get(`roster/get-my-roster-for-table/${user}/${status}`)
  },
  getRosterForId: async function (user, task) {
    return await api.get(`roster/get-my-roster-for-id/${user}/${task}`)
  },
  changeUser: async function (user, task, users, reason) {
    return await api.post(`roster/request-change-user/${user}/${task}?reason=${reason}`, users)
  },
  changeStatus: async function (user, task, status) {
    return await api.put(`roster/change-status/${task}/${user}/${status}`, )
  },
  getChildList: async function (user_id) {
    return await api.get(`roster/get-child-for-supervisor?supervisor=${user_id}`)
  },
  getLatestRoster: async function (user_id) {
    return await api.get(`roster/get-my-latest-roster/${user_id}`)
  },
}

