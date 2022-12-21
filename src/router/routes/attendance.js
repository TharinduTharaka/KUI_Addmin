export default[
    {
        path: '/apps/attendance',
        name: 'apps-attendance',
        component: () => import('@/views/Attendance/vue-good-table/GoodTable.vue'),
        meta: {
            pageTitle: 'Attendance',
        },
    },
    {
        path: '/apps/attendance/createAttendance',
        name: 'createMyTask',
        component: () => import('@/views/Attendance/createAttendance'),
        meta: {
            pageTitle: 'Create Attendance',
        },
    },

]
