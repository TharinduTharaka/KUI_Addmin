import { api } from '@/store/api'

export default {
    getProfileData: async function (user_id) {
        return await api.get(`/task/profile/details/${user_id}`)
    },
}
