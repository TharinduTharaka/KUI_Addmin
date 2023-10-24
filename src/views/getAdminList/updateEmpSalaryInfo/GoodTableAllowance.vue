<template>
  <b-card-code title="Allowances">

    <b-button
        variant="primary"
        @click = "getSalaryMasterDataByCategory()"
        class="mr-2"
    >
      Add New Allowances
    </b-button>

    <b-button
        variant="secondary"
        v-b-modal.update-master-category-allowance
    >
      Add New Allowances Category
    </b-button>
    <!-- input search -->
    <div class="custom-search d-flex justify-content-end">

      <b-form-group>

        <div class="d-flex align-items-center">


          <label class="mr-1">Search</label>
          <b-form-input
              v-model="searchTerm"
              placeholder="Search"
              type="text"
              class="d-inline-block"
          />
        </div>
      </b-form-group>
    </div>


    <b-modal
        id="modal-select22"
        title="Update Basic Salary"
        ok-title="submit"
        cancel-variant="outline-secondary"
        @ok="updateSalary"
    >
      <b-form>
        <b-form-group
            label="Chose the Type"
            label-for="vue-select"
        >
          <v-select
              id="vue-select"
              v-model="selected"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="option"
          />
        </b-form-group>
        <b-form-group
            label="Chose the Addition Type"
            label-for="vue-select"
        >
          <v-select
              id="vue-select"
              v-model="selected_for_Addition_type"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="additionType"
          />
        </b-form-group>

        <b-form-group
            label="Chose the Effective Date"
            label-for="vue-select"
        >
          <b-form-datepicker
              id="v-startDate"
              v-model="startDate"
              placeholder="Enter Date"
          />
        </b-form-group>
        <b-form-group
            label="amount"
            label-for="salary-amount"
        >
          <b-form-input
              id="salary-amount"
              type="number"
              v-model="salaryAmount"
              placeholder="amount"
              required
          />
        </b-form-group>

        <b-form-group
            label="Reason"
            label-for="vue-select"
        >
          <b-form-input
              id="salary-amount"
              type="text"
              v-model="reason"
              placeholder="reason"
              required
          />
        </b-form-group>
      </b-form>
    </b-modal>


    <b-modal
        id="update-master-category-allowance"
        title="Update Master Salary Type"
        ok-title="submit"
        cancel-variant="outline-secondary"
        @ok="updateMasterSalaryType"
    >
      <b-form>
        <b-form-group
            label="Enter the Type"
            label-for="vue-select"
        >
          <b-form-input
              id="salary-amount"
              type="text"
              v-model="type"
              placeholder="type"
              required
          />
        </b-form-group>

      </b-form>
    </b-modal>

    <b-modal id="salary_info_allowance" title="Salary Breakdown" cancel-variant="outline-secondary" size="xl">
      <vue-good-table
          :columns="columns_for_breakdown"
          :rows="items_for_breakdown"
          :rtl="direction"
          :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
          :pagination-options="{
        enabled: true,
        perPage:pageLength
      }"
      >
        <template
            slot="table-row"
            slot-scope="props"
        >

          <!-- Column: Name -->
          <div
              v-if="props.column.field === 'fullName'"
              class="text-nowrap"
          >
            <span class="text-nowrap">{{ props.row.fullName }}</span>
          </div>

          <!-- Column: Status -->
          <span v-else-if="props.column.field === 'status'">
            <b-badge :variant="statusVariant(props.row.status)">
              {{ getStatusData(props.row.status) }}
            </b-badge>
          </span>

          <span v-else-if="props.column.field === 'additionType'">
            <b-badge :variant="additionTypeVariant(props.row.additionType)">
              {{ getAdditionTypeData(props.row.additionType) }}
            </b-badge>
          </span>

          <!-- Column: Action -->
          <span v-else-if="props.column.field === 'approve' && props.formattedRow.status === 0">
            <span>
              <b-button
                  variant="primary"
                  @click="updateEachType(props.formattedRow.id, 1)"
              >
                Approve
              </b-button>
          </span>
            </span>
          <span v-else-if="props.column.field === 'reject'  && props.formattedRow.status === 0">
            <span>
              <b-button
                  variant="danger"
                  @click="updateEachType(props.formattedRow.id, 2)"
              >
              Reject
            </b-button>
          </span>
        </span>



        </template>

        <!-- pagination -->
        <template
            slot="pagination-bottom"
            slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap">
              Showing 1 to
            </span>
              <b-form-select
                  v-model="pageLength"
                  :options="['3','5','10']"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap "> of {{ props.total }} entries </span>
            </div>
            <div>
              <b-pagination
                  :value="1"
                  :total-rows="props.total"
                  :per-page="pageLength"
                  first-number
                  last-number
                  align="right"
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mt-1 mb-0"
                  @input="(value)=>props.pageChanged({currentPage:value})"
              >
                <template #prev-text>
                  <feather-icon
                      icon="ChevronLeftIcon"
                      size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                      icon="ChevronRightIcon"
                      size="18"
                  />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>
      </vue-good-table>
    </b-modal>

    <vue-good-table
        :columns="columns"
        :rows="items"
        :rtl="direction"
        :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
        :pagination-options="{
        enabled: true,
        perPage:pageLength
      }"
    >
      <template
          slot="table-row"
          slot-scope="props"
      >

        <!-- Column: Name -->
        <div
            v-if="props.column.field === 'fullName'"
            class="text-nowrap"
        >
          <span class="text-nowrap">{{ props.row.fullName }}</span>
        </div>

        <!-- Column: Status -->
        <span v-else-if="props.column.field === 'status'">
          <b-badge :variant="statusVariant(props.row.status)">
            {{ getStatusData(props.row.status) }}
          </b-badge>
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-button
                variant="primary"
                @click="updateStatus(props.formattedRow.id)"
            >
              See More
            </b-button>
          </span>
        </span>



      </template>

      <!-- pagination -->
      <template
          slot="pagination-bottom"
          slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap">
              Showing 1 to
            </span>
            <b-form-select
                v-model="pageLength"
                :options="['3','5','10']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap "> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
            >
              <template #prev-text>
                <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>

    <template #code>
      {{ codeColumnSearch }}
    </template>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BButton, BFormDatepicker,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import { codeColumnSearch } from './code'
import payroll from "@/api/payroll";
import vSelect from 'vue-select'
import {getUserData} from "@/auth/utils";

export default {
  components: {
    BFormDatepicker,
    BButton,
    BCardCode,
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    vSelect
  },
  data() {
    return {
      pageLength: 10,
      dir: false,
      codeColumnSearch,
      salaryAmount : '',
      startDate: '',
      selected: '',
      selected_for_Addition_type: '',
      reason: '',
      type: '',
      additionType: ['Addition','Deduction'],
      option: '',
      columns: [
        {
          label: 'id',
          field: 'id',

        },
        {
          label: 'Category',
          field: 'category',

        },
        {
          label: 'Type',
          field: 'type',

        },
        {
          label: 'Status',
          field: 'status',

        },
        {
          label: 'Amount',
          field: 'amount',

        },
        {
          label: 'Action',
          field: 'action',

        }
      ],
      items: [

      ],
      columns_for_breakdown: [
        {
          label: 'id',
          field: 'id',

        },
        {
          label: 'Category',
          field: 'category',

        },
        {
          label: 'Type',
          field: 'type',

        },
        {
          label: 'Status',
          field: 'status',

        },
        {
          label: 'Amount',
          field: 'amount',

        },
        {
          label: 'Addition Type',
          field: 'additionType',

        },
        {
          label: 'Created Date',
          field: 'createdDate',

        },
        {
          label: 'Approved Date',
          field: 'approvedDate',

        },
        {
          label: 'Approved By',
          field: 'approvedBy',

        },
        {
          label: 'Reason',
          field: 'reason',

        },
        {
          label: 'Effective Date',
          field: 'effectiveDate',

        },
        {
          label: 'Approve',
          field: 'approve',

        },
        {
          label: 'Reject',
          field: 'reject',

        },
      ],
      items_for_breakdown: [

      ],
      rows: [],
      tableData: [],
      tableFields: ['name', 'id'],
      searchTerm: '',
    }
  },

  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    await this.getAllowanceSalaryById(localStorage.getItem('child_id'))
  },

  computed: {
    statusVariant() {
      const statusColor = {
        0 :  'light-warning',
        1 : 'light-primary',
        5 : 'light-success',
        9 : 'light-danger',
        2 : 'light-danger',
      }

      return status => statusColor[status]
    },
    getStatusData() {
      const statusValue = {
        0 : 'Pending Approval',
        1 : 'Approved',
        2 : 'Rejected',
        4 : 'Supervisor Rejected',
      }

      return status => statusValue[status]
    },
    additionTypeVariant() {
      const statusColor = {
        0 :  'light-danger',
        1 : 'light-success'
      }

      return status => statusColor[status]
    },
    getAdditionTypeData() {
      const statusValue = {
        0 : 'Deduction',
        1 : 'Addition'
      }

      return status => statusValue[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  methods: {

    async getAllowanceSalaryById(id) {
      let response = (await payroll.getAllowanceSalaryById(id))
      console.log(response)
      this.items = response.data.data
      this.totalRows = response.data.data.total

    },
    makeToast(msg,variant) {
      this.$bvToast.toast(`${msg}`, {
        title: `${variant || 'default'}`,
        variant,
        solid: false,
      })
    },
    async updateSalary() {

      const userData = getUserData()
      await payroll.updateSalary(localStorage.getItem('child_id'), 'Allowances',this.selected,this.salaryAmount,userData.id, this.selected_for_Addition_type,this.reason, this.startDate)
          .then((res) => {
            this.selected = ''
            this.selected_for_Addition_type = ''
            this.salaryAmount = ''
            this.reason = ''
            if (res.data.code === 200){
              this.getAllowanceSalaryById(localStorage.getItem('child_id'))
              this.makeToast(res.data.msg, 'success');

            }
            else {
              this.makeToast(res.data.msg, 'danger');
            }
          })
          .catch(({response}) => {
            this.selected = ''
            this.selected_for_Addition_type = ''
            this.salaryAmount = ''
            this.reason = ''
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger');
          })
    },
    async updateMasterSalaryType() {

      const userData = getUserData()
      await payroll.updateSalaryMasterDataType('Allowances',this.type,userData.id)
          .then((res) => {
            this.type = ''

            if (res.data.code === 200){
              this.makeToast(res.data.msg, 'success');
            }
            else {
              this.makeToast(res.data.msg, 'danger');
            }
          })
          .catch(({response}) => {
            this.type = ''
            this.makeToast('Error', 'danger');
          })
    },
    async getSalaryMasterDataByCategory() {

      await payroll.getSalaryMasterDataTypeByCategory('Allowances')
          .then((res) => {

            if (res.data.code === 200){
              this.option = res.data.data
              this.$bvModal.show('modal-select22');
            }
            else {
              this.makeToast('Error Loading Salary Master Data', 'danger');
            }
          })
          .catch(({response}) => {
            this.type = ''
            this.makeToast('Error Loading Salary Master Data', 'danger');
          })
    },
    async updateStatus(id) {
      await this.getSalaryBreakdownForEachType(id)
    },
    async getSalaryBreakdownForEachType(id) {
      this.$bvModal.show('salary_info_allowance');
      let response = (await payroll.getSalaryBreakdownForEachType(id))
      this.items_for_breakdown = response.data.data
      this.totalRows = response.data.data.total

    },
    async updateEachType(id,status) {
      const userData = getUserData()
      await payroll.updateEachType(id,status,userData.id)
          .then((res) => {
            this.$bvModal.hide('salary_info_allowance');
            if (res.data.code === 200){
              this.getAllowanceSalaryById(localStorage.getItem('child_id'))
              this.makeToast(res.data.msg, 'success');

            }
            else {
              this.$bvModal.hide('salary_info_allowance');
              this.makeToast(res.data.msg, 'danger');
            }
          })
          .catch(({response}) => {
            this.$bvModal.hide('salary_info_allowance');
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger');
          })
      this.items_for_breakdown = response.data.data
      this.totalRows = response.data.data.total

    },
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>