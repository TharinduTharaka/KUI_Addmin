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
        path: '/apps/attendance',
        name: 'apps-supervisor-attendance',
        component: () => import('@/views/Attendance/supervisor-attendance/GoodTable'),
        meta: {
            pageTitle: 'Supervisor Attendance',
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
    {
        path: '/apps/attendance/deleteAttendance/:id',
        name: 'deleteMyTask',
        component: () => import('@/views/Attendance/deleteAttendance'),
        meta: {
            pageTitle: 'Delete Attendance',
        },
    },
    {
        path: '/apps/invoice/preview/4987',
        name: 'apps-invoice-preview',
        component: () => import('@/views/apps/invoice/invoice-preview/InvoicePreview.vue'),
    },
    {
        path: '/apps/minor-staff-attendance',
        name: 'apps-attendance',
        component: () => import('@/views/minor-staff2/newAttendanceMinorStaff/GoodTable'),
        meta: {
            pageTitle: 'Attendance',
        },
    }

]
