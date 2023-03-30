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
        path: '/apps/myDailyCount',
        name: 'apps-myDailyCount',
        component: () => import('@/views/myDailyCount/vue-good-table/GoodTable.vue'),
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
        path: '/apps/minor-staff-leaves',
        name: 'apps-leaves',
        component: () => import('@/views/minor-staff2/minorStaffLeave/GoodTable'),
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
        path: '/apps/minor-staff-leaves/add',
        name: 'apps-leaves-add',
        component: () => import('@/views/minor-staff2/create-leave/createMyTask'),
        meta: {
            pageTitle: 'Add Minor Staff Leaves',
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
        path: '/apps/processPayroll',
        name: 'apps-supervisorRoster',
        component: () => import('@/views/leaves/supervisor-roster/GoodTable.vue'),
        meta: {
            pageTitle: 'Supervisor Roster',
        },
    },
    {
        path: '/apps/process-payslip',
        name: 'apps-processPayslip',
        component: () => import('@/views/processPayroll/payroll-summery/GoodTable.vue'),
        meta: {
            pageTitle: 'Payroll Summery',
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
    {
        path: '/apps/process-ot-approval/:date_val',
        name: 'apps-otApproval',
        component: () => import('@/views/processOtApproval/otApprovalSummery/GoodTable.vue'),
        meta: {
            pageTitle: 'OT approval',
        },
    },
    {
        path: '/apps/process-minor-staff',
        name: 'apps-minor-staff',
        component: () => import('@/views/minor-staff2/otApprovalSummery/GoodTable.vue'),
        meta: {
            pageTitle: 'process minor staff',
        },
    },
    {
        path: '/apps/process-daily-config',
        name: 'apps-process-daily-config',
        component: () => import('@/views/processPayroll/get-payroll-summery/GoodTable.vue'),
        meta: {
            pageTitle: 'Process Daily Config',
        },
    },
]
