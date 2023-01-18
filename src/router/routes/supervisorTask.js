export default[
    {
        path: '/apps/supervisorTask',
        name: 'apps-supervisorTask',
        component: () => import('@/views/supervisorTask/vue-good-table/GoodTable.vue'),
        meta: {
            pageTitle: 'Supervisor Task',
        },
    },
    {
        path: '/apps/supervisorTask/createMyTask',
        name: 'createMyTask',
        component: () => import('@/views/myTask/createMyTask'),
        meta: {
            pageTitle: 'Create My Task',
        },
    },
    {
        path: '/apps/supervisorTask/editSupervisorTask/:task_id/:user_id',
        name: 'editSupervisorTask',
        component: () => import('@/views/supervisorTask/editSupervisorTask'),
        meta: {
            pageTitle: 'Edit Supervisor Task',
        },
    },
    {
        path: '/apps/leaves',
        name: 'apps-leaves',
        component: () => import('@/views/leaves/GoodTable'),
        meta: {
            pageTitle: 'Leaves',
        },
    },
    {
        path: '/apps/leaves/add',
        name: 'apps-leaves-add',
        component: () => import('@/views/leaves/create-leave/createMyTask'),
        meta: {
            pageTitle: 'Add My Leaves',
        },
    },
    {
        path: '/apps/leaves/available-leaves',
        name: 'apps-leaves-available',
        component: () => import('@/views/leaves/availble-leaves/bs-table/TableCustomRender'),
        meta: {
            pageTitle: 'My Available Leaves',
        },
    },
    {
        path: '/apps/supervisorLeave',
        name: 'apps-supervisorLeave',
        component: () => import('@/views/leaves/supervisor-leave/GoodTable.vue'),
        meta: {
            pageTitle: 'Supervisor Leave',
        },
    },
    {
        path: '/apps/myRoster',
        name: 'apps-myRoster',
        component: () => import('@/views/leaves/roster/calendar/Calendar'),
        meta: {
            pageTitle: 'My Roster',
        },
    },
    {
        path: '/apps/supervisorRoster',
        name: 'apps-supervisorRoster',
        component: () => import('@/views/leaves/supervisor-roster/GoodTable.vue'),
        meta: {
            pageTitle: 'Supervisor Roster',
        },
    },
    {
        path: '/apps/childRoster',
        name: 'apps-child-calendar',
        component: () => import('@/views/leaves/roster/child-calendar/Calendar'),
        meta: {
            pageTitle: 'Child Calendar',
        },
    },
]
