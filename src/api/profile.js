import { api } from '@/store/api'

export default {
    getProfileData: async function (user_id) {
        return await api.get(`/task/profile/${user_id}`)
    },
}
