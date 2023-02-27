<template>
  <b-card>

    <b-sidebar
        id="sidebar-creat"
        backdrop
        bg-variant="white"
        right
        shadow
    >
      <sidebar-content title="Create"/>
    </b-sidebar>
    <b-sidebar
        id="sidebar-edit"
        backdrop
        bg-variant="white"
        right
        shadow
    >
      <sidebar-content title="Edit"/>
    </b-sidebar>

    <div class="custom-search">

      <!-- advance search input -->
      <b-row>

      </b-row>
    </div>
    <b-button
        style="margin-bottom: 10px"
        variant="primary"
        @click="updateStatus(-1, 2)"
    >
      Approve All
    </b-button>
    <div>

    </div>
    <b-button
        style="margin-bottom: 10px"
        variant="warning"
        @click="updateStatus(-1, 3)"
    >
      Revert All
    </b-button>


    <!-- table -->
    <div>
      <b-table
          :current-page="currentPage"
          :fields="fields"
          :filter="filter"
          :items="items"
          :per-page="perPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          class="position-relative"
          hover
          responsive
          striped>
        <template #cell(show_details)="row">

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox
              v-model="row.detailsShowing"
              @change="row.toggleDetails"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }}
          </b-form-checkbox>
        </template>

        <template #cell(action)="row">

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-button
              v-if="row.item.applyOt === 0"
              size="sm"
              variant="success"
              @click="updateStatus(row.item.id, 1)">
            Apply OT
          </b-button>
          <b-button
              v-if="row.item.applyOt === 1"
              size="sm"
              variant="danger"
              @click="updateStatus(row.item.id, 1)">
            Remove OT
          </b-button>
        </template>

        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
          </b-badge>
        </template>
        <template #cell(applyOt)="data">
          <b-badge :variant="applyOt[1][data.value]">
            {{ applyOt[0][data.value] }}
          </b-badge>
        </template>

      </b-table>
    </div>
    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

      <!-- page length -->
      <b-form-group
          class="text-nowrap mb-md-0 mr-1"
          label="Per Page"
          label-align="left"
          label-cols="6"
          label-for="sortBySelect"
          label-size="sm"
      >
        <b-form-select
            id="perPageSelect"
            v-model="perPage"
            :options="pageOptions"
            inline
            size="sm"
        />
      </b-form-group>

      <!-- pagination -->
      <div>
        <b-pagination
            v-model="currentPage"
            :per-page="perPage"
            :total-rows="totalRows"
            class="mb-0"
            first-number
            last-number
            next-class="next-item"
            prev-class="prev-item"
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
    </b-card-body>
  </b-card>
</template>

<script>
// import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCardBody,
  BCol,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BImg,
  BPagination,
  BRow,
  BSidebar,
  BTable,
  BToast,
  VBToggle,
} from 'bootstrap-vue' // eslint-disable-line
import {VueGoodTable} from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import SidebarContent from './SidebarContent.vue'
import vSelect from 'vue-select'
import myTaskAPI from '@/api/my_task'
import leaveAPI from "@/api/leave_ui";
import {getUserData} from "@/auth/utils";
// import {useRouter} from "vue-router";
// import { codeAdvance } from './code'
/* eslint-disable */
export default {
  components: {
    BCard,
    BToast,
    BImg,
    BCardBody,
    vSelect,
    BBadge,
    BSidebar,
    SidebarContent,
    BFormCheckbox,
    BTable,
    BButton,
    VueGoodTable,
    BAvatar,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    // ToastificationContent,
  },
  /* eslint-disable */
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  filterTable(){
    console.log(this.selected);
  },
  /* eslint-disable */
  data() {
    return {
      userID: 1,
      pageLength: 5,
      pageOptions: [3, 5, 10],
      perPage: 40,
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      dir: false,
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' }
      ],

      // filter: {
      //   resource:null,
      //   department:null,
      // },

      filter: null,
      resource: '',
      resourceOptions: ['Thesis', 'General'],
      department: '',
      departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Management', 'Acupuncture', 'IT'],
      rows: [],
      searchTerm: '',
      fields: [
        'action',
        {
          key: 'applyOt',
          label: 'Apply OT'

        },
        'date',
        'inTime',
        'outTime',
        'comment',
        {
          key: 'status',
          label: 'Status'

        },
        'totalWorkingTime',
        'lateTime',
        'otTime',
        'empName',
        'id',
      ],
      /* eslint-disable global-require */
      items: [
        {
          taskTitle: "",
          startDate: "",
          endDate: '',
          status: "",
          applyOt : 0,
          estimate: ""
        },
      ],
      /* eslint-disable global-require */
      status: [
        {
          1      : 'Need Your Attention',
          2      : 'Supervisor Pending',
          3      : 'Success',
          4      : 'Supervisor Completed',
          5      : 'Supervisor Rejected',
        },
        {
          1      : 'light-danger',
          2      : 'light-warning',
          3      : 'light-info',
          4      : 'light-success',
        }
      ],
      applyOt: [
        {
          1      : 'OT Applicable',
          0      : 'OT Not applicable'
        },
        {
          1      : 'light-warning',
          0      : 'light-success'
        }
      ],
      rating: [
        {
          1: 'Unacceptable',
          2: 'Inconsistent',
          3: 'Successful',
          4: 'Exceeds Expectations',
          5: 'Exceptional',
          6: 'Not Applicable',
        },
        {
          1: 'light-primary',
          2: 'light-danger',
          3: 'light-success',
          4: 'light-info',
          5: 'light-success',
          6: 'light-success',
        }
      ],
      priority: [
        {
          High: 'High',
          Medium: 'Medium',
          Low: 'Low',
        },
        {
          High: 'light-danger',
          Medium: 'light-primary',
          Low: 'light-success',
        }
      ],
    }
  },
  setup() {
    // const router = useRouter();
    return {}
  },
  /* eslint-disable */
  computed: {
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
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    await this.getAllLeaves()
  },
  methods: {
    advanceSearch(val) {
      this.filter = val
    },
    onRowClick(params) {
      console.log(params)
    },
    getStatus(val) {
      if (val === 'draft') {
        return 'published'
      } else {
        return 'draft'
      }
    },
    makeToast(msg, variant) {
      this.$bvToast.toast(`${msg}`, {
        title: `${variant || 'default'}`,
        variant,
        solid: false,
      })
    },
    async getAllLeaves() {
      //let response = (await leaveAPI.getData(localStorage.getItem('child_id')))
      let response = (await leaveAPI.getAllAttendanceDataForApproval(localStorage.getItem('child_id')))
      console.log(response)
      this.items = response.data.data
      this.totalRows = response.data.data.total

    },
    async deleteResource(userID, taskID) {
      const userData = getUserData()
      await myTaskAPI.deleteBySupervisor(userData.id, taskID)
          .then((res) => {
            console.log('deleted')
            this.makeToast('Removed successfully', 'success');
            // toast("Order removed successfully", "success");
            this.getAllLeaves()
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger');
          })
    },
    async updateStatus(id, status) {
      if (id === -1)
        id = localStorage.getItem('child_id')
      await leaveAPI.updateAttendanceStatus(id, status)
          .then((res) => {
            this.makeToast('Updated successfully', 'success');
            this.getAllLeaves()
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger');
          })
    }

  },
}
</script>
