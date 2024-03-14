<template>
  <section class="invoice-preview-wrapper">

    <!-- Alert: No item found -->
    <b-alert
        variant="danger"
        :show="invoiceData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching invoice data
      </h4>
      <div class="alert-body">
        No invoice found with this invoice id. Check
        <b-link
            class="alert-link"
            :to="{ name: 'apps-invoice-list'}"
        >
          Invoice List
        </b-link>
        for other invoices.
      </div>
    </b-alert>

    <b-row
        class="invoice-preview"
    >

      <!-- Col: Left (Invoice Container) -->
      <b-col
          cols="12"
          xl="9"
          md="8"
      >
        <b-card
            no-body
            class="invoice-preview-card"
        >
          <!-- Header -->
          <b-card-body class="invoice-padding pb-0">

            <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">

              <!-- Header: Left Content -->
              <div>
                <div class="logo-wrapper">
                  <img
                      class="img-fluid w-90"
                      width="130px"
                      height="130px"
                      :src="require('@/assets/images/kiu/KIU LOGO1_2.png')"
                      alt="image slot"
                  >
                  <h1 class="text-danger invoice-logo">
                    KIU
                  </h1>
                </div>
                <p class="card-text mb-25">
                  KIU University
                </p>
                <p class="card-text mb-25">
                  No 249/1,Malabe Road,
                </p>
                <p class="card-text mb-25">
                  Thalangama North ,Koswatta
                </p>
                <p class="card-text mb-0">

                </p>
              </div>

              <!-- Header: Right Content -->
              <div class="mt-md-0 mt-2">
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    Date Issued:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.date }}
                  </p>
                </div>
                <!--                <div class="invoice-date-wrapper">-->
                <!--                  <p class="invoice-date-title">-->
                <!--                    Due Date:-->
                <!--                  </p>-->
                <!--                  <p class="invoice-date">-->
                <!--                    {{ invoiceData.dueDate }}-->
                <!--                  </p>-->
                <!--                </div>-->
              </div>
            </div>
          </b-card-body>

          <!-- Spacer -->
          <hr class="invoice-spacing">

          <!-- Invoice Client & Payment Details -->
          <b-card-body
              class="invoice-padding pt-0"
          >
            <b-row class="invoice-spacing">

              <!-- Col: Invoice To -->
              <b-col
                  cols="12"
                  xl="6"
                  class="p-0"
              >
                <h6 class="mb-2">
                  Employee Details:
                </h6>
                <h6 class="mb-25">
                  Name : {{ invoiceData.name }}
                </h6>
                <p class="card-text mb-25">
                  EPF No : {{ invoiceData.epfNo }}
                </p>
                <p class="card-text mb-25">
                  Designation : {{ invoiceData.designation }}
                </p>
                <p class="card-text mb-25">
                  Date : {{ invoiceData.date }}
                </p>
              </b-col>

              <!-- Col: Payment Details -->
                            <b-col
                              xl="6"
                              cols="12"
                              class="p-0 mt-xl-0 mt-2 d-flex justify-content-xl-end"
                            >
                              <div>
                                <h6 class="mb-2">
<!--                                  Payment Details:-->
                                </h6>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td class="pr-1">
<!--                                        Total Amount:-->
                                      </td>
<!--                                      <td><span class="font-weight-bold">{{ invoiceData.totalAmount }}</span></td>-->
                                    </tr>
                                    <tr>
                                      <td class="pr-1">
<!--                                        Bank name:-->
                                      </td>
                                      <td></td>
                                    </tr>
<!--                                    <tr>-->
<!--                                      <td class="pr-1">-->
<!--                                        Country:-->
<!--                                      </td>-->
<!--                                      <td></td>-->
<!--                                    </tr>-->
                                  </tbody>
                                </table>
                              </div>
                            </b-col>
            </b-row>
          </b-card-body>

          <b-table-lite
              responsive
              :items="invoiceData.payrollPdfInfoBasicObjects"
              :fields="['basic','total']"
          >
            <template #cell(taskDescription)="data">
              <b-card-text class="text-nowrap">
                {{ data.item.description }}
              </b-card-text>
            </template>
          </b-table-lite>

          <b-table-lite
              responsive
              :items="invoiceData.payrollPdfInfoNoPayObjects"
              :fields="['totalForEPF','total']"
          >
            <template #cell(taskDescription)="data">
              <b-card-text class="text-nowrap">
                {{ data.item.description }}
              </b-card-text>
            </template>
          </b-table-lite>

          <!-- Invoice Description: Table -->
          <b-table-lite
              responsive
              :items="invoiceData.payrollPdfInfoEarningObjectList"
              :fields="['earnings','total']"
          >
            <template #cell(taskDescription)="data">
              <b-card-text class="text-nowrap">
                {{ data.item.description }}
              </b-card-text>
            </template>
          </b-table-lite>

          <!-- Invoice Description: Total -->
          <b-card-body class="invoice-padding pb-0">
            <b-row>

              <!-- Col: Sales Persion -->
              <b-col
                  cols="12"
                  md="6"
                  class="mt-md-0 mt-3"
                  order="2"
                  order-md="1"
              >
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">Total Gross Earnings:</span>
                </b-card-text>
              </b-col>

              <!-- Col: Total -->
              <b-col
                  cols="12"
                  md="6"
                  class="mt-md-6 d-flex justify-content-end"
                  order="1"
                  order-md="2"
              >
                <div class="invoice-total-wrapper">
                  <div class="invoice-total-item">
                    <p class="invoice-total-amount">
                      {{ invoiceData.payrollEntityDetails.grossSalary }}
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>

          <b-card-body class="invoice-padding pb-0">
            <b-row>

              <!-- Col: Sales Persion -->
              <b-col
                  cols="12"
                  md="6"
                  class="mt-md-0 mt-3"
                  order="2"
                  order-md="1"
              >
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">EPF 12%:</span>
                </b-card-text>
              </b-col>

              <!-- Col: Total -->
              <b-col
                  cols="12"
                  md="6"
                  class="mt-md-6 d-flex justify-content-end"
                  order="1"
                  order-md="2"
              >
                <div class="invoice-total-wrapper">
                  <div class="invoice-total-item">
                    <p class="invoice-total-amount">
                      {{ invoiceData.payrollEntityDetails.epfAddition }}
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>

          <b-card-body class="invoice-padding pb-0">
            <b-row>

              <!-- Col: Sales Persion -->
              <b-col
                  cols="12"
                  md="6"
                  class="mt-md-0 mt-3"
                  order="2"
                  order-md="1"
              >
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">ETF 3%:</span>
                </b-card-text>
              </b-col>

              <!-- Col: Total -->
              <b-col
                  cols="12"
                  md="6"
                  class="mt-md-6 d-flex justify-content-end"
                  order="1"
                  order-md="2"
              >
                <div class="invoice-total-wrapper">
                  <div class="invoice-total-item">
                    <p class="invoice-total-amount">
                      {{ invoiceData.payrollEntityDetails.etf }}
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- Spacer -->
          <hr class="invoice-spacing">

          <b-table-lite
              responsive
              :td-class="'text-right'"
              :items="invoiceData.payrollPdfInfoDeductionObjects"
              :fields="['deduction','total']"
          >
          </b-table-lite>

          <b-card-body class="invoice-padding pb-0">
            <b-row>

              <!-- Col: Sales Persion -->
              <b-col
                  cols="12"
                  md="6"
                  class="mt-md-0 mt-3"
                  order="2"
                  order-md="1"
              >
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">Total Deductions:</span>
                </b-card-text>
              </b-col>

              <!-- Col: Total -->
              <b-col
                  cols="12"
                  md="6"
                  class="mt-md-6 d-flex justify-content-end"
                  order="1"
                  order-md="2"
              >
                <div class="invoice-total-wrapper">
                  <div class="invoice-total-item">
                    <p class="invoice-total-amount">
                      {{ invoiceData.payrollEntityDetails.totalDeductions }}
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>

          <b-card-body class="invoice-padding pb-0">
            <b-row>

              <!-- Col: Sales Persion -->
              <b-col
                  cols="12"
                  md="6"
                  class="mt-md-0 mt-3"
                  order="2"
                  order-md="1"
              >
                <b-card-text class="mb-0">
                  <span class="font-weight-bold">Employee:</span>
                  <span class="ml-75">{{ invoiceData.name }} </span>
                </b-card-text>
              </b-col>

              <!-- Col: Total -->
              <b-col
                  cols="12"
                  md="6"
                  class="mt-md-6 d-flex justify-content-end"
                  order="1"
                  order-md="2"
              >
                <div class="invoice-total-wrapper">
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Gross Salary:
                    </p>
                    <p class="invoice-total-amount">
                      {{ invoiceData.payrollEntityDetails.grossSalary }}
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Deductions:
                    </p>
                    <p class="invoice-total-amount">
                      {{ invoiceData.payrollEntityDetails.totalDeductions }}
                    </p>
                  </div>
                  <hr class="my-50">
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Net Salary:
                    </p>
                    <p class="invoice-total-amount">
                      {{ invoiceData.totalAmount }}
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>

          <!-- Spacer -->
          <hr class="invoice-spacing">

          <hr class="invoice-spacing">

          <!-- Note -->
          <b-card-body class="invoice-padding pt-0">
            <span class="font-weight-bold">Note: </span>
            <span>Please verify contents of this statement on receipt and inform Accounts Dept. Within 7 days if any
discrepancies are noted so that corrective action could be taken early.</span>
            <h6><b>This is a computer generated slip and will not require a signature </b></h6>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col
          cols="12"
          md="4"
          xl="3"
          class="invoice-actions"
      >
        <b-card>

          <!-- Button: DOwnload -->
<!--          <b-button-->
<!--              v-ripple.400="'rgba(186, 191, 199, 0.15)'"-->
<!--              variant="outline-secondary"-->
<!--              class="mb-75"-->
<!--              block-->
<!--          >-->
<!--            Download-->
<!--          </b-button>-->

          <!-- Button: Print -->
          <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
              class="mb-75"
              block
              @click="printInvoice"
          >
            Download
          </b-button>
        </b-card>
      </b-col>
    </b-row>

    <invoice-sidebar-send-invoice/>
    <invoice-sidebar-add-payment/>
  </section>
</template>

<script>
import {ref, onUnmounted} from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import {
  BRow, BCol, BCard, BCardBody, BTableLite, BCardText, BButton, BAlert, BLink, VBToggle,
} from 'bootstrap-vue'
import Logo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'
import invoiceStoreModule from '../invoiceStoreModule'
import InvoiceSidebarSendInvoice from '../InvoiceSidebarSendInvoice.vue'
import InvoiceSidebarAddPayment from '../InvoiceSidebarAddPayment.vue'
import KIULogo from "@core/layouts/components/KIULogo";
import html2pdf from "html2pdf.js/src";
import {getUserData} from "@/auth/utils";
import myTaskAPI from "@/api/my_task";

export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    KIULogo,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BTableLite,
    BCardText,
    BButton,
    BAlert,
    BLink,

    Logo,
    InvoiceSidebarAddPayment,
    InvoiceSidebarSendInvoice,
  },

  setup() {
    const invoiceData = ref(null)
    const paymentDetails = ref({})


    const invoiceDescription = [
      {
        title: 'Basic Salary',
        Earnings: 'Basic Salary',
        rate: '$60.00',
        hours: '30',
        total: '57,500.00',
      },
      {
        title: 'UI Kit Design',
        Earnings: 'Budgetary Allowance',
        rate: '$60.00',
        hours: '20',
        total: '2,500.00',
      },
      {
        title: 'UI Kit Design',
        Earnings: 'Rent Reimbursement',
        rate: '$60.00',
        hours: '20',
        total: '35,000.00',
      },
      {
        title: 'UI Kit Design',
        Earnings: 'Travelling Allowance',
        rate: '$60.00',
        hours: '20',
        total: '30,000.00',
      },
      {
        title: 'UI Kit Design',
        Earnings: 'Travelling Allowance',
        rate: '$60.00',
        hours: '20',
        total: '30,000.00',
      },
      {
        title: 'UI Kit Design',
        Earnings: 'Insurance premium',
        rate: '$60.00',
        hours: '20',
        total: '30,000.00',
      },
    ]

    const deductionDescription = [
      {
        title: 'Basic Salary',
        Deduction: 'SWA',
        rate: '$60.00',
        hours: '30',
        total: '250.00',
      },
      {
        title: 'UI Kit Design',
        Deduction: 'EPF 8%',
        rate: '$60.00',
        hours: '20',
        total: '4,800.00',
      }
    ]

    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    myTaskAPI.getPayRollInfo(localStorage.getItem('child_id'))
        .then(response => {
          invoiceData.value = response.data.data
        })
        .catch(error => {
          if (error.response.status === 404) {
            invoiceData.value = undefined
          }
        })

    const printInvoice = () => {
      window.print()
    }

    return {
      invoiceData,
      paymentDetails,
      invoiceDescription,
      deductionDescription,
      printInvoice,
    }
  },
  data() {
    return {
      items: {
        code: 200,
        msg: "",
        data: {
          id: 464,
          name: "",
          epfNo: "",
          designation: "",
          date: "",
          totalAmount: "",
          payrollPdfInfoEarningObjectList: [],
          payrollPdfInfoBasicObjects: [],
          payrollPdfInfoNoPayObjects: [],
          payrollPdfInfoDeductionObjects: [],
          payrollEntityDetails: {
            id: 356,
            payrollId: 1,
            empId: 464,
            serialId: 94,
            name: "",
            isNoPay: 1,
            isOt: 0,
            isLate: 0,
            advance: 0.0,
            isActive: 1,
            applicableDates: 30,
            isOtBasic: 1,
            isNoPayBasic: 1,
            totalOt: 1427.08,
            totalNoPay: 3000.0,
            basicSalary: 45000.0,
            notApplicable: null,
            grossSalary: 100000.0,
            totalLateAmount: 332.292,
            totalMorningLate: 0.0,
            epfDeduction: 3600.0,
            epfAddition: 5400.0,
            etf: 7200.0,
            totalDeductions: 7225.0,
            totalAdditions: 55000.0,
            published: 0
          }
        }
      }

    }
  },
  async getVal() {
    const userData = getUserData()
    this.userID = userData.id
    this.totalRows = this.items.length

    await this.getInfo()
  },
  async getInfo() {
    let response = (await myTaskAPI.getPayRollInfo(464))

    this.items = response.data.data;
    this.totalRows = response.data.data.length
  },
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
</style>

<style lang="scss">
@media print {

  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }
  footer.footer {
    display: none;
  }
  .text-right {
    text-align: right;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // Invoice Specific Styles
  .invoice-preview-wrapper {
    .row.invoice-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .invoice-preview-card {
        .card-body:nth-of-type(2) {
          .row {
            > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .invoice-actions {
      display: none;
    }
  }
}
</style>
