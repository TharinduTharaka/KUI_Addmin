export default[
    {
        path: '/apps/myTask',
        name: 'apps-myTask',
        component: () => import('@/views/myTask/vue-good-table/GoodTable.vue'),
        meta: {
            pageTitle: 'My Task',
        },
    },
    {
        path: '/apps/myTask/createMyTask',
        name: 'createMyTask',
        component: () => import('@/views/myTask/createMyTask'),
        meta: {
            pageTitle: 'Create My Task',
        },
    },
    {
        path: '/apps/myTask/editMyTask/:task_id',
        name: 'editMyTask',
        component: () => import('@/views/myTask/editMyTask'),
        meta: {
            pageTitle: 'Edit My Task',
        },
    },
]
