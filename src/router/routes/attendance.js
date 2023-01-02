export default[
    {
        path: '/apps/attendance',
        name: 'apps-attendance',
        component: () => import('@/views/Attendance/newAttendance/GoodTable'),
        meta: {
            pageTitle: 'Attendance',
        },
    },
    {
        path: '/apps/attendance/editAttendance/:id',
        name: 'editMyTask',
        component: () => import('@/views/Attendance/createAttendance'),
        meta: {
            pageTitle: 'Edit Attendance',
        },
    },

]
