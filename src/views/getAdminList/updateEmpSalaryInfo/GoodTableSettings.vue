<template>
  <b-card-code title="Payroll Setting">

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
        <span v-else-if="props.column.field === 'value'">
          <b-badge :variant="statusVariant(props.row.value)">
            {{ getStatusData(props.row.value) }}
          </b-badge>
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action' && props.formattedRow.value === 0">
          <span>
            <b-button
                variant="primary"
                @click="updateStatus(props.formattedRow.id, 1)"
            >
              Approve
            </b-button>
          </span>
        </span>

        <span v-else-if="props.column.field === 'action' && props.formattedRow.value === 1">
          <span>
            <b-button
                variant="primary"
                @click="updateStatus(props.formattedRow.id, 0)"
            >
              Not Approve
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
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BButton,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import { codeColumnSearch } from './code'
import payroll from "@/api/payroll";
import vSelect from 'vue-select'
import {getUserData} from "@/auth/utils";

export default {
  components: {
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
          label: 'Setting Name',
          field: 'settingName',

        },
        {
          label: 'value',
          field: 'value',

        },
        {
          label: 'createdDate',
          field: 'createdDate',

        },
        {
          label: 'createdBy',
          field: 'createdBy',

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
    await this.getSalarySettingById(localStorage.getItem('child_id'))
  },

  computed: {
    statusVariant() {
      const statusColor = {
        0 :  'light-warning',
        1 : 'light-success',
        3 : 'light-danger'
      }

      return status => statusColor[status]
    },
    getStatusData() {
      const statusValue = {
        0 : 'Not Approved',
        1 : 'Approved',
        2 : 'Pending Approval'
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

    async getSalarySettingById(id) {
      let response = (await payroll.getSalarySetting(id))
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
      await payroll.updateSalary(localStorage.getItem('child_id'), 'Deductions',this.selected,this.salaryAmount,userData.id, this.selected_for_Addition_type,this.reason)
          .then((res) => {
            this.selected = ''
            this.selected_for_Addition_type = ''
            this.salaryAmount = ''
            this.reason = ''
            if (res.data.code === 200){
              this.getDeductionSalaryById(localStorage.getItem('child_id'))
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
      await payroll.updateSalaryMasterDataType('Deductions',this.type,userData.id)
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

      await payroll.getSalaryMasterDataTypeByCategory('Deductions')
          .then((res) => {

            if (res.data.code === 200){
              this.option = res.data.data
              this.$bvModal.show('modal-select222');
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
    async updateStatus(id,status) {
      await payroll.updateSalarySetting(id,status)
          .then((res) => {
            if (res.data.code === 200){
              this.getSalarySettingById(localStorage.getItem('child_id'))
              this.makeToast(res.data.msg, 'success');

            }
            else {

              this.makeToast(res.data.msg, 'danger');
            }
          })
          .catch(({response}) => {
            this.error = response.data.error
            this.makeToast(this.error, 'danger');
          })
    },
    async getSalaryBreakdownForEachType(id) {
      this.$bvModal.show('salary_info_deduction');
      let response = (await payroll.getSalaryBreakdownForEachType(id))
      this.items_for_breakdown = response.data.data
      this.totalRows = response.data.data.total

    },
    async updateEachType(id,status) {
      const userData = getUserData()
      await payroll.updateEachType(id,status,userData.id)
          .then((res) => {
            this.$bvModal.hide('salary_info_deduction');
            if (res.data.code === 200){
              this.getDeductionSalaryById(localStorage.getItem('child_id'))
              this.makeToast(res.data.msg, 'success'); 

            }
            else {
              this.$bvModal.hide('salary_info_deduction');
              this.makeToast(res.data.msg, 'danger');
            }
          })
          .catch(({response}) => {
            this.$bvModal.hide('salary_info_deduction');
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