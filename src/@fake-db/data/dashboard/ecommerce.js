import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  congratulations: {
    name: 'John',
    saleToday: '48900',
  },
  statisticsItems: [
    {
      icon: 'TrendingUpIcon',
      color: 'light-primary',
      title: '8.10',
      subtitle: 'In Time',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      icon: 'UserIcon',
      color: 'light-info',
      title: '2',
      subtitle: 'Missing Attendance',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      icon: 'BoxIcon',
      color: 'light-danger',
      title: '3',
      subtitle: 'Pending Leaves',
      customClass: 'mb-2 mb-sm-0',
    },
    {
      icon: 'DollarSignIcon',
      color: 'light-success',
      title: '2023-01-27',
      subtitle: 'Upcoming Roster',
      customClass: '',
    },
  ],
  statisticsOrder: {
    series: [
      {
        name: '2020',
        data: [45, 85, 65, 45, 65],
      },
    ],
  },
  statisticsProfit: {
    series: [
      {
        data: [0, 20, 5, 30, 15, 45],
      },
    ],
  },
  earningsChart: {
    series: [53, 16, 31],
  },
  revenue: {
    years: ['2020', '2019', '2018'],
    price: '160',
    budget: '',
    revenueReport: {
      series: [
        {
          name: 'Earning',
          data: [20, 18, 21, 20, 22, 21, 23, 21, 20],
        },
        {
          name: 'Expense',
          data: [-1, -2, -0, -5, -2, -4, -0, -4, -9],
        },
      ],
    },
    budgetChart: {
      series: [
        {
          data: [61, 48, 69, 52, 60, 40, 79, 60, 59, 43, 62],
        },
        {
          data: [20, 10, 30, 15, 23, 0, 25, 15, 20, 5, 27],
        },
      ],
    },
  },
  companyTable: [
    {
      type: 'Dixons',
      Jan: '2',
      Feb: '2',
      Mar: '2',
      Apr: '2',
      May: '2',
      June: '2',
      July: '2',
      Aug: '2',
      Sep: '2',
      Oct: '2',
      Nov: '2',
      Dev: '2'
    }
  ],

  meetup: {
    mediaData: [
      { avatar: 'CalendarIcon', title: 'Sat, May 25, 2020', subtitle: '10:AM to 6:PM' },
      { avatar: 'MapPinIcon', title: 'Central Park', subtitle: 'Manhattan, New york City' },
    ],
    avatars: [
      { avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg'), fullName: 'Billy Hopkins' },
      { avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'), fullName: 'Amy Carson' },
      { avatar: require('@/assets/images/portrait/small/avatar-s-8.jpg'), fullName: 'Brandon Miles' },
      { avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'), fullName: 'Daisy Weber' },
      { avatar: require('@/assets/images/portrait/small/avatar-s-20.jpg'), fullName: 'Jenny Looper' },
    ],
  },
  goalOverview: {
    completed: '786,617',
    inProgress: '13,561',
    series: [83],
  },
  transactionData: [
    {
      mode: 'Wallet',
      types: 'Starbucks',
      avatar: 'PocketIcon',
      avatarVariant: 'light-primary',
      payment: '-$74',
      deduction: true,
    },
    {
      mode: 'Bank Transfer',
      types: 'Add Money',
      avatar: 'CheckIcon',
      avatarVariant: 'light-success',
      payment: '+$480',
      deduction: false,
    },
    {
      mode: 'Paypal',
      types: 'Add Money',
      avatar: 'DollarSignIcon',
      avatarVariant: 'light-danger',
      payment: '+$480',
      deduction: false,
    },
    {
      mode: 'Mastercard',
      types: 'Ordered Food',
      avatar: 'CreditCardIcon',
      avatarVariant: 'light-warning',
      payment: '-$23',
      deduction: true,
    },
    {
      mode: 'Transfer',
      types: 'Refund',
      avatar: 'TrendingUpIcon',
      avatarVariant: 'light-info',
      payment: '+$98',
      deduction: false,
    },
  ],
}
/* eslint-disable global-require */
mock.onGet('/ecommerce/data').reply(() => [200, data])
