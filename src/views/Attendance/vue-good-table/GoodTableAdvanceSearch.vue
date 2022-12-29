<template>
  <b-card>
    <!--    <b-button-->
    <!--        v-if="isSupervisorPendingCount > 0"-->
    <!--        style="margin-bottom: 10px"-->
    <!--        variant="primary"-->
    <!--        @click="() => $router.push(`/apps/supervisorTask`)"-->
    <!--    >-->
    <!--      Add-->
    <!--    </b-button>-->

    <!--    add button-->
    <b-row>
      <b-col md="1">
        <b-button
            v-if="!buttonVisible"
            style="margin-bottom: 10px"
            variant="primary"
            @click="() => $router.push(`/apps/attendance/createAttendance`)"
        >
          Add
        </b-button>
      </b-col>
      <b-col>
        <b-button
            v-if="buttonVisible"
            onclick="buttonVisible=false"
            style="margin-bottom: 10px;"
            variant="primary"
            @click="getAllTask()"
        >
          Back
        </b-button>
      </b-col>
    </b-row>


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
        <b-col md="4">
          <b-form-group>
            <label>Search:</label>
            <b-form-input
                class="d-inline-block"
                placeholder="Search"
                type="text"
                @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </div>


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
        <!-- full detail on click -->
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col>
                <div class="bg-light-primary rounded-top text-center">
                  <b-img
                      :src="require('@/assets/images/illustration/email.svg')"
                      alt="Meeting Pic"
                      height="170"
                  />
                </div>
              </b-col>
            </b-row>


            <b-row class="mb-2">
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Title : </strong>{{ row.item.taskTitle }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Start Date : </strong>{{ row.item.startDate }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>End Date : </strong>{{ row.item.endDate }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Label: </strong>{{ row.item.label }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Estimate : </strong>{{ row.item.estimate }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Original Estimate: </strong>{{ row.item.originalEstimate }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Status : </strong>
                <b-badge :variant="status[1][row.item.status]">
                  {{ status[0][row.item.status] }}
                </b-badge>
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Priority : </strong>
                <b-badge :variant="priority[1][row.item.priority]">
                  {{ priority[0][row.item.priority] }}
                </b-badge>
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Label : </strong>{{ row.item.label }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Estimate : </strong>{{ row.item.estimate }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Original Estimate : </strong>{{ row.item.originalEstimate }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Description : </strong>{{ row.item.taskDescription }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Rating : </strong>
                <b-badge :variant="rating[1][row.item.rating]">
                  {{ rating[0][row.item.rating] }}
                </b-badge>
              </b-col>
              <b-col
                  class="mb-1"
                  md="4">
                <strong>Rating Comment : </strong>{{ row.item.ratingComment }}
              </b-col>
            </b-row>

            <div class="demo-inline-spacing">
              <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="row.toggleDetails"
              >
                Hide Details
              </b-button>
              <b-button
                  v-if="row.item.status ===1"
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-primary"
                  @click="() => $router.push(`/apps/myTask/editMyTask/${row.item.id}/${userID}`)"
              >
                edit
              </b-button>
              <b-button
                  v-if="row.item.status ===1"
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-danger"
                  @click="deleteResource(userID,row.item.id)">
                Delete
              </b-button>
              <b-button
                  v-if="row.item.status ===1"
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-primary"
                  @click="updateNotApplicable(userID,row.item.id)">
                Not Applicable
              </b-button>
            </div>
          </b-card>
        </template>

        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
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

    <b-modal
        ref="my-modal"
        hide-footer
        title="Attention Needed !"
    >
      <div class="d-block text-center">
        <h3>You Have To Review {{ isSupervisorPendingCount }} Completed Child Tasks. Please Review Them First To
          Continue</h3>
      </div>
      <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          block
          class="mt-3"
          variant="outline-secondary"
          @click="hideModal"
      >
        Review Child Task
      </b-button>
    </b-modal>

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
import attendance from "@/api/Attendance";
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
  filterTable() {
    console.log(this.selected);
  },
  /* eslint-disable */
  data() {
    return {
      buttonVisible: false,
      userID: 1,
      pageLength: 5,
      pageOptions: [3, 5, 10],
      perPage: 5,
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      dir: false,
      options: [
        {text: 'Orange', value: 'orange'},
        {text: 'Apple', value: 'apple'},
        {text: 'Pineapple', value: 'pineapple'},
        {text: 'Grape', value: 'grape'}
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
      isSupervisorPendingCount: 0,


      // fields: [
      //   'show_details',
      //   'Employee ID',
      //   'Date',
      //   'In Time',
      //   'Out Time',
      //   'Working duration',
      //   'Type',
      //   'Comment',
      //   'Approved By',
      //   'Approved Date',
      //
      // ],

      fields: [
        'show_details',
        'empId',
        'date',
        'inTime',
        'outTime',
        'workDuration',
        'type',
        'comment',
        'approvedBy',
        'approvedDate',

      ],
      /* eslint-disable global-require */
      items: [
        {
          empId:'',
          date:'',
          in_time:'',
          out_time:'',
          work_duration:'',
          type:'',
          comment:'',
          approved_by:'',
          approved_date:''
  }
      ],
      /* eslint-disable global-require */
      status: [
        {
          1: 'Pending',
          2: 'Deleted',
          3: 'Completed',
          4: 'Supervisor Deleted',
          5: 'Supervisor Completed'
        },
        {
          1: 'light-primary',
          2: 'light-danger',
          3: 'light-success',
          4: 'light-danger',
          5: 'light-success'
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

    console.log(localStorage.getItem('child_id'))
    const userData = getUserData()
    this.userID = userData.id
    console.log(this.userID);
    await this.getAllAttendance()

    this.totalRows = this.items.length
    // await this.getIsSupervisorReviewCount()

    // if (this.isSupervisorPendingCount > 0) {
    //   this.showModal()
    // }


  },
  methods: {
    async tasksFilter(val, button) {
      console.log(val, button);
      this.buttonVisible = button;
      let response = (await myTaskAPI.getDataForFilter(this.userID, val))
      console.log(response)
      this.items = response.data.data;
      this.totalRows = response.data.data.length

    },
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
    async getAllAttendance() {
      // const userData = getUserData()

      let response = (await attendance.getAllAttendanceData())
      console.log(response)
      this.items = response.data.data;

      console.log("items", this.items )
      this.totalRows = response.data.data.length
    },

  },
}
</script>
