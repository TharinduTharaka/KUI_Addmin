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
        path: '/apps/payrollDetails',
        name: 'apps-payroll-details',
        component: () => import('@/views/processPayroll/vue-good-table/GoodTable.vue'),
        meta: {
            pageTitle: 'Payroll Details',
        },
    },
    {
        path: '/apps/myPenalty',
        name: 'apps-my-penalty',
        component: () => import('@/views/penalty/penalty-table/vue-good-table/GoodTable.vue'),
        meta: {
            pageTitle: 'My Penalty',
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
        path: '/apps/myTask/filterMyTask/:status',
        name: 'filterTable',
        component: () => import('@/views/myTask/vue-good-table/FilterTable'),
        meta: {
            pageTitle: 'Filter Table',
        },
    },
    {
        path: '/apps/myTask/filterChildTask/:status',
        name: 'filterTable',
        component: () => import('@/views/myTask/vue-good-table/SupervisorFilterTable'),
        // meta: {
        //     pageTitle: 'Filter Table',
        // },
        meta: {
            pendingTaskPageTitle: 'Pending Task Filter Table',
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
        path: '/apps/childLeave',
        name: 'childLeave',
        component: () => import('@/views/leaves/child-leave/vue-good-table/ChildTask'),
        meta: {
            pageTitle: 'Child Leave',
        },
    },
    {
        path: '/apps/childOtApproval/:date_val',
        name: 'childLeave',
        component: () => import('@/views/processOtApproval/childOtApproval/vue-good-table/ChildTask'),
        meta: {
            pageTitle: 'Child OT Approval',
        },
    },
    {
        path: '/apps/childAttendance',
        name: 'childAttendance',
        component: () => import('@/views/Attendance/child-attendance/GoodTable'),
        meta: {
            pageTitle: 'Child Attendance',
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
    },
    {
        path: '/apps/profile/addPost',
        name: 'addProfileTask',
        component: () => import('@/views/pages/profile/blog/BlogEdit'),
        meta: {
            pageTitle: 'Add My Profile Post',
        },
    },
    {
        path: '/roster/editMyRoster/:task_id/:user_id',
        name: 'editMyRoster',
        component: () => import('@/views/leaves/roster/child/editMyTask'),
        meta: {
            pageTitle: 'Edit My Roster',
        },
    },
    {
        path: '/apps/invoice/list',
        name: 'apps-invoice-list',
        component: () => import('@/views/apps/invoice/invoice-list/InvoiceList.vue'),
    }
]
