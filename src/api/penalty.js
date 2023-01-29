import { api } from '@/store/api'

export default {

  getPenalty: async function (user, status) {
    return await api.get(`/penalty/get-penalty-by-id/${user}/${status}`)
  }

}



