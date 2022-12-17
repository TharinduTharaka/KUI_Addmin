import { api } from '@/store/api'

export default {

  getData: async function (id) {
    return await api.get(`leave/get_leave_by_id/${id}`)
  }

}
