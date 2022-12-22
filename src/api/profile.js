import { api } from '@/store/api'

export default {
    getProfileData: async function (user_id) {
        return await api.get(`/task/profile/details/${user_id}`)
    },
    createPost: async function (user_id, payload) {
        return await api.post(`/task/profile/add_post/${user_id}`, payload)
    },
    getFeedData: async function (id) {
        return await api.get(`/task/profile/get_profile/${id}`)
    },
    getNewFeatureCheckCount: async function (id, status) {
        return await api.get(`/task/profile/get_check_feature_alert_count/${id}/${status}`)
    },
}
