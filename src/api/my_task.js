import { api } from '@/store/api'

export default {

    getData: async function (user_id) {
        return await api.get(`/task/get-my-task?user_id=${user_id}`)
    },

    create: async function (payload) {
        return await api.post(`/task/create_task`, payload)
    },

    delete: async function (user_id, task_id) {
        return await api.put(`/task/delete-task?user_id=${user_id}&task_id=${task_id}`)
    },


    update: async function (payload, user_id, task_id) {
        return await api.post(`/task/edit_task?task_id=${task_id}&user_id=${user_id}`, payload)
    },

    getTaskData: async function (user_id, task_id) {
        return await api.get(`/task/get-my-task-by-id?user_id=${user_id}&task=${task_id}`)
    },

    // updateStatus: async function (data, status, updated_user,type) {
    //     return await api.put(`/book/update-eresource-status`, null, {
    //         params: {
    //             data,
    //             status,
    //             updated_user,
    //             type
    //         }
    //     })
    // },

    // fileUpload: async function (payload, id,type) {
    //     return await api.post(`/book/uploadMultipleFiles`, payload, { params: { id,type } },
    //         {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         })
    // },
}
