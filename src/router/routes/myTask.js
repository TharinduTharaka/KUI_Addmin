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
        path: '/apps/myTask/createChildTask',
        name: 'createChildTask',
        component: () => import('@/views/myTask/createChildTask'),
        meta: {
            pageTitle: 'Create Chid Task',
        },
    },
    {
        path: '/apps/myTask/filterMyTask/:today/:pending/:com/:delete',
        name: 'filterTable',
        component: () => import('@/views/myTask/vue-good-table/FilterTable'),
        meta: {
            pageTitle: 'Filter Table',
        },
    },
    {
        path: '/apps/childTask',
        name: 'childTask',
        component: () => import('@/views/myTask/vue-good-table/ChildTask'),
        meta: {
            pageTitle: 'Child Task',
        },
    },
    {
        path: '/apps/myTask/editMyTask/:task_id/:user_id',
        name: 'editMyTask',
        component: () => import('@/views/myTask/editMyTask'),
        meta: {
            pageTitle: 'Edit My Task',
        },
    },
    {
        path: '/apps/myTask/editChildTask/:task_id/:user_id',
        name: 'editChildTask',
        component: () => import('@/views/myTask/editChildTask'),
        meta: {
            pageTitle: 'Edit Child Task',
        },
    }
]
