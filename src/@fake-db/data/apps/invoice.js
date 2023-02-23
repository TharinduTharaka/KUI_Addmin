import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

/* eslint-disable global-require */
const data = {
  invoices: [
    {
      id: 4987,
      issuedDate: '10 Jan 2023',
      client: {
        address: 'Secretary',
        company: '254',
        companyEmail: '',
        country: 'USA',
        contact: 'Jan-23',
        name: 'B.Thishani Imasha Rodrigo',
      },
      service: 'Software Development',
      total: 3428,
      avatar: '',
      balance: '$724',
      dueDate: '23 Apr 2019',
    }
  ],
}
/* eslint-enable */

// ------------------------------------------------
// GET: Return Users
// ------------------------------------------------
mock.onGet('/apps/invoice/invoices').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, sortBy = 'id', sortDesc = false, status = null } = config.params
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.invoices.filter(
    invoice =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (invoice.client.companyEmail.toLowerCase().includes(queryLowered) ||
        invoice.client.name.toLowerCase().includes(queryLowered)) &&
      invoice.invoiceStatus === (status || invoice.invoiceStatus),
  )
  /* eslint-enable  */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return [
    200,
    {
      invoices: paginateArray(sortedData, perPage, page),
      total: filteredData.length,
    },
  ]
})

// ------------------------------------------------
// GET: Return Single Invoice
// ------------------------------------------------
mock.onGet(/\/apps\/invoice\/invoices\/\d+/).reply(config => {
  // Get event id from URL
  let invoiceId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  invoiceId = Number(invoiceId)

  const invoiceIndex = data.invoices.findIndex(e => e.id === invoiceId)
  const invoice = data.invoices[invoiceIndex]
  const responseData = {
    invoice,
    paymentDetails: {
      totalDue: '$12,110.55',
      bankName: 'American Bank',
      country: 'United States',
      iban: 'ETD95476213874685',
      swiftCode: 'BR91905',
    },
  }

  if (invoice) return [200, responseData]
  return [404]
})

// ------------------------------------------------
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/apps/invoice/clients').reply(() => {
  const clients = data.invoices.map(invoice => invoice.client)
  return [200, clients.slice(0, 5)]
})
