import { api } from '@/store/api'

export default {

    getData: async function (user_id) {
        return await api.get(`/task/get-my-task?user_id=${user_id}`)
    },

    getChildList: async function (user_id) {
        return await api.get(`/task/get-child-for-supervisor?supervisor=${user_id}`)
    },

    create: async function (payload) {
        return await api.post(`/task/create_task`, payload)
    },

    delete: async function (user_id, task_id) {
        return await api.put(`/task/delete-task?user_id=${user_id}&task_id=${task_id}`)
    },

    deleteBySupervisor: async function (user_id, task_id) {
        return await api.put(`/task/delete-task-supervisor?user_id=${user_id}&task_id=${task_id}`)
    },
    revertBySupervisor: async function (user_id, task_id) {
        return await api.put(`/task/revert-task-supervisor?user_id=${user_id}&task_id=${task_id}`)
    },
    update: async function (payload, user_id, task_id) {
        return await api.post(`/task/edit_task?task_id=${task_id}&user_id=${user_id}`, payload)
    },

    getTaskData: async function (user_id, task_id) {
        return await api.get(`/task/get-my-task-by-id?user_id=${user_id}&task=${task_id}`)
    },

    taskLogin: async function (email, id) {
        return await api.get(`/task/login?email=${email}&id=${id}`)
    },
    getCompletedTaskByDay: async function (id) {
        return await api.get(`/task/get-completed-task-count?id=${id}`)
    },
    getLastSevenDay: async function (id) {
        return await api.get(`/task/get-last-seven-days-count?id=${id}`)
    },
    getLastFourDue: async function (id) {
        return await api.get(`/task/get-last-due-four?id=${id}`)
    },
    getSupportTracker: async function (id) {
        return await api.get(`/task/total-story-points-per-day?id=${id}`)
    }
}
