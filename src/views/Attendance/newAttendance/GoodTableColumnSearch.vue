<template>
  <b-card-code title="My Attendance">

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

    <!-- table -->
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
        <span v-else-if="props.column.field === 'attendanceStatus'">
          <b-badge :variant="getFinalStatusVariant(props.row.attendanceStatus)">
            {{ getFinalStatus(props.row.attendanceStatus) }}
          </b-badge>
        </span>
        <span v-else-if="props.column.field === 'applyOt'">
          <b-badge :variant="getApplyOtStatusColour(props.row.applyOt)">
            {{ getApplyOtStatusValue(props.row.applyOt) }}
          </b-badge>
        </span>
        <span v-else-if="props.column.field === 'requestIssue'">
          <b-badge :variant="getRequestIssueStatusColour(props.row.requestIssue)">
            {{ getRequestIssueStatusValue(props.row.requestIssue) }}
          </b-badge>
        </span>
        <span v-else-if="props.column.field === 'applyLate'">
          <b-badge :variant="getApplyLateStatusColour(props.row.applyLate)">
            {{ getApplyLateStatusValue(props.row.applyLate) }}
          </b-badge>
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-button
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item @click="onRowClick(props)">
                <feather-icon
                    icon="TrashIcon"
                    class="mr-50"
                />
                <span>Edit</span>
              </b-dropdown-item>
            </b-button>
          </span>
        </span>

        <span v-else-if="props.column.field === 'action2'">
          <span>
            <b-button
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item @click="onRowClickForOtApply(props, 7)" v-if="props.formattedRow.applyOt === 0">
                <feather-icon
                    icon="MessageSquareIcon"
                    class="mr-50"
                />
                <span>Request OT</span>
              </b-dropdown-item>
              <b-dropdown-item @click="onRowClickForOtApply(props, 8)" v-if="props.formattedRow.applyOt === 3">
                <feather-icon
                    icon="MessageSquareIcon"
                    class="mr-50"
                />
                <span>Remove OT Request</span>
              </b-dropdown-item>
            </b-button>
          </span>
        </span>

        <span v-else-if="props.column.field === 'action3'">
          <span>
            <b-button
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item @click="onRowClickForOtApply(props, 9)" v-if="props.formattedRow.applyLate === 0">
                <feather-icon
                    icon="MessageSquareIcon"
                    class="mr-50"
                />
                <span>Request Late</span>
              </b-dropdown-item>
              <b-dropdown-item @click="onRowClickForOtApply(props, 10)" v-if="props.formattedRow.applyLate === 3">
                <feather-icon
                    icon="MessageSquareIcon"
                    class="mr-50"
                />
                <span>Remove Late Request</span>
              </b-dropdown-item>
            </b-button>
          </span>
        </span>


        <span v-else-if="props.column.field === 'action4'">
          <span>
            <b-button
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                    icon="MoreVerticalIcon" 
                    size="16"
                    class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item @click="onRowClickForReviewRequest(props, 1)" v-if="props.formattedRow.requestIssue === 0">
                <feather-icon
                    icon="MessageSquareIcon"
                    class="mr-50"
                />
                <span>Request Issue</span>
              </b-dropdown-item>
<!--              <b-dropdown-item @click="onRowClickForReviewRequest(props, 10)" v-if="props.formattedRow.applyLate === 3">-->
<!--                <feather-icon-->
<!--                    icon="MessageSquareIcon"-->
<!--                    class="mr-50"-->
<!--                />-->
<!--                <span>Remove Late Request</span>-->
<!--              </b-dropdown-item>-->
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
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import { codeColumnSearch } from './code'
import databaseAPI from "@/api/database_ui";
import attendanceAPI from "@/api/Attendance";
import {getUserData} from "@/auth/utils";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import leaveAPI from "@/api/leave_ui";

export default {
  components: {
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
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      codeColumnSearch,
      columns: [
        {
          label: 'id',
          field: 'id',
          filterOptions: {
            enabled: true,
            placeholder: 'Search id',
          },
        },
        {
          label: 'Name',
          field: 'empName',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Name',
          },
        },
        {
          label: 'Date',
          field: 'date',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'In Time',
          field: 'inTime',
          filterOptions: {
            enabled: true,
            placeholder: 'Search In Time',
          },
        },
        {
          label: 'Out Time',
          field: 'outTime',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Out Time',
          },
        },
        {
          label: 'requestIssue',
          field: 'requestIssue',
          filterOptions: {
            enabled: false,
            placeholder: 'Search Apply OT',
          },
        },
        {
          label: 'Action4',
          field: 'action4',

        },
        {
          label: 'Type',
          field: 'type',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Type',
          },
        },
        {
          label: 'Comment',
          field: 'comment',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Comment',
          },
        },
        {
          label: 'Status',
          field: 'status',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Status',
          },
        },
        {
          label: 'attendanceStatus',
          field: 'attendanceStatus',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Status',
          },
        },
        {
          label: 'Total Working Time',
          field: 'totalWorkingTime',
          filterOptions: {
            enabled: true,
            placeholder: 'Search id',
          },
        },
        {
          label: 'Late Time',
          field: 'lateTime',
          filterOptions: {
            enabled: true,
            placeholder: 'Search id',
          },
        },
        {
          label: 'Morning Late Time',
          field: 'morningLateTime',
          filterOptions: {
            enabled: true,
            placeholder: 'Search id',
          },
        },
        {
          label: 'Over Time',
          field: 'otTime',
          filterOptions: {
            enabled: true,
            placeholder: 'Search id',
          },
        },
        {
          label: 'Approved By',
          field: 'approvedBy',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Approved By',
          },
        },
        {
          label: 'Approved Date',
          field: 'approvedDate',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Approved Date',
          },
        },
        {
          label: 'Action',
          field: 'action',

        },
        {
          label: 'applyOt',
          field: 'applyOt',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Apply OT',
          },
        },
        {
          label: 'Action2',
          field: 'action2',

        },
        {
          label: 'applyLate',
          field: 'applyLate',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Apply Late',
          },
        },
        {
          label: 'Action3',
          field: 'action3',

        }
      ],
      items: [

      ],
      rows: [],
      searchTerm: '',
    }
  },

  async mounted() {
    this.totalRows = this.items.length
    await this.getAllLeaves()
  },

  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        1      : 'light-danger',
        2      : 'light-warning',
        3      : 'light-info',
        4      : 'light-success',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    getStatusData() {
      const statusValue = {
        /* eslint-disable key-spacing */
        1      : 'Need Your Attention',
        2      : 'Supervisor Pending',
        3      : 'Success',
        4      : 'Supervisor Completed',
        5      : 'Supervisor Rejected',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusValue[status]
    },
    getFinalStatusVariant() {
      const statusColor = {
        '-1'      : 'light-danger',
        0      : 'light-warning',
        1      : 'light-info',
        2      : 'light-success',
        3      : 'light-success',
        4      : 'light-success',
        5      : 'light-success',
        6      : 'light-success',
        7      : 'light-success',
        8      : 'light-danger',
        9      : 'light-warning',
        10     : 'light-warning',
        11     : 'light-success',
        12     : 'light-success',

      }

      return status => statusColor[status]
    },
    getFinalStatus() {
      const statusValue = {
        /* eslint-disable key-spacing */
        '-1'      : 'No Pay Weekend',
        0      : 'Saturday Half Day',
        1      : 'Sunday Leave',
        2      : 'Saturday Normal Work',
        3      : 'Saturday Full And Day Off Cover',
        4      : 'Sunday Full Day Work For Day Off',
        5      : 'Sunday Half Day Work For Day Off',
        6      : 'Sunday Extra Day Full Work',
        7      : 'Saturday Normal Day And Extra Work',
        8      : 'No Pay Weekday',
        9      : 'Week Day Half Day',
        10     : 'Week Day Full Day Leave',
        11     : 'Week Day Working Day',
        12     : 'Sunday Extra Half Work',
        /* eslint-enable key-spacing */
      }

      return status => statusValue[status]
    },
    getApplyOtStatusColour() {
      const statusColor = {
        0      : 'light-success',
        1      : 'light-info',
        3      : 'light-warning'
      }
      return status => statusColor[status]
    },
    getApplyOtStatusValue() {
      const statusColor = {
        0      : 'OT Not Applicable',
        1      : 'OT Applicable',
        3      : 'OT Requested'
      }
      return status => statusColor[status]
    },
    getRequestIssueStatusValue() {
      const statusColor = {
        0      : 'No Issue',
        1      : 'Request Issue',
        2      : 'Review Pending',
        3      : 'Request Accepted',
        4      : 'Request Rejected'
      }
      return status => statusColor[status]
    },
    getApplyLateStatusColour() {
      const statusColor = {
        0      : 'light-success',
        1      : 'light-info',
        3      : 'light-warning',
        4      : 'light-primary',
        5      : 'light-danger'
      }
      return status => statusColor[status]
    },
    getRequestIssueStatusColour() {
      const statusColor = {
        0      : 'light-success',
        1      : 'light-info',
        3      : 'light-warning',
        4      : 'light-primary',
        5      : 'light-danger'
      }
      return status => statusColor[status]
    },
    getApplyLateStatusValue() {
      const statusColor = {
        0      : 'Late Not Applicable',
        1      : 'Late Applicable',
        3      : 'Late Requested',
        4      : 'Late Approved',
        5      : 'Late Rejected'
      }
      return status => statusColor[status]
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
  created() {
    this.$http.get('/good-table/basic')
      .then(res => { this.rows = res.data })
  },
  methods: {
    onRowClick(params) {

      if (params.formattedRow.status !== 1) {

        const variant = 'danger';

        this.$bvToast.toast(`This Row Cannot Be Edited`, {
          title: `${variant || 'default'}`,
          variant,
          solid: false,
        })
      }
      else {
        this.$router.push(`/apps/attendance/editAttendance/${params.formattedRow.id}`)
      }
    },
    async onRowClickForOtApply(params, status_id) {

      leaveAPI.updateAttendanceStatus(params.formattedRow.id, status_id, '2')
          .then((res) => {
            this.getAllLeaves()
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger');
          })


    },
    async onRowClickForReviewRequest(params, status_id) {

      leaveAPI.updateAttendanceStatusForReviewRequest(params.formattedRow.id, status_id, '2')
          .then((res) => {
            this.getAllLeaves()
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger');
          })


    },
    async getAllLeaves() {
      const userData = getUserData()
      let response = (await attendanceAPI.getAllAttendanceData(userData.id))
      console.log(response)
      this.items = response.data.data
      this.totalRows = response.data.data.total

    }
  }
}
</script>
