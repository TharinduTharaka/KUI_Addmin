<template>
  <b-card>
    <b-row>
      <b-col>
        <b-button
            style="margin-bottom: 10px"
            variant="primary"
            @click="() => $router.push(`/apps/myTask/createChildTask`)"
        >
          Add
        </b-button>
      </b-col>
      <b-col>
        <div class="text-right" v-if="backButton">
          <b-button

              style="margin-bottom: 10px;"
              variant="primary"
              @click="backButtonClick(false)"
          >
            back
          </b-button>
        </div>

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

        <b-col md="2" style="padding-top: 10px" v-if="pendingButton">
          <!--          <b-button-->
          <!--              variant="primary"-->
          <!--              @click="() => $router.push(`/apps/myTask/filterMyTask/1`)"-->
          <!--          >-->
          <!--            Pending Task List-->
          <!--          </b-button>-->
          <b-button
              block
              variant="primary"
              @click="buttonFilter(1,true)"
          >
            Pending <br> Task List
          </b-button>
        </b-col>
        <b-col md="2" style="padding-top: 10px" v-if="completedButton">
          <!--          <b-button-->
          <!--              variant="success"-->
          <!--              @click="() => $router.push(`/apps/myTask/filterMyTask/3`)"-->
          <!--          >-->
          <!--            Completed Task List-->
          <!--          </b-button>-->
          <b-button
              block
              variant="success"
              @click="buttonFilter(3,true)"
          >
            Completed <br> Task List
          </b-button>
        </b-col>
        <b-col md="2" style="padding-top: 10px" v-if="deletedButton">
          <b-button
              block
              variant="danger"
              @click="buttonFilter(2,true)"
          >
            Deleted <br> Task List
          </b-button>
        </b-col>
        <b-col md="2" style="padding-top: 10px" v-if="supervisorButton">
          <b-button
              block
              variant="info"
              @click="buttonFilter(4,true)"
          >
            Supervisor <br> Completed
          </b-button>
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
                  v-if="row.item.status === 2 || row.item.status === 3 || row.item.status === 1"
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-primary"
                  @click="() => $router.push(`/apps/myTask/editChildTask/${row.item.id}/${userID}`)"
              >
                edit
              </b-button>
<!--              <b-button-->
<!--                  v-if="row.item.status ===1 || row.item.status === 3"-->
<!--                  size="sm"-->
<!--                  style="margin-left: 10px"-->
<!--                  variant="outline-primary"-->
<!--                  @click="updateNotApplicable(userID,row.item.id)">-->
<!--                Not Applicable-->
<!--              </b-button>-->
              <b-button
                  v-if="row.item.status ===1 || row.item.status ===2"
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-danger"
                  @click="deleteResource(userID,row.item.id)">
                Delete
              </b-button>
              <b-button
                  v-if="row.item.status ===2 || row.item.status ===3 || row.item.status ===5"
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-success"
                  @click="revertBySupervisor(userID,row.item.id)">
                Revert
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
      backButton: false,
      pendingButton: true,
      completedButton: true,
      deletedButton: true,
      supervisorButton: true,
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
        'show_details',
        'taskTitle',
        'startDate',
        'endDate',
        {
          key: 'status',
          label: 'Status'

        },
        'estimate'
      ],
      /* eslint-disable global-require */
      items: [
        {
          taskTitle: "",
          startDate: "",
          endDate: '',
          status: "",
          estimate: ""
        },
      ],
      /* eslint-disable global-require */
      status: [
        {
          1: 'Pending',
          2: 'Deleted',
          3: 'Completed',
          4: 'Supervisor Deleted',
          5: 'Supervisor Completed',
        },
        {
          1: 'light-primary',
          2: 'light-danger',
          3: 'light-success',
          4: 'light-danger',
          5: 'light-success',
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
    await this.getAllTask()
  },
  methods: {
    async backButtonClick(buttonClick) {
      const userData = getUserData()
      let response = (await myTaskAPI.getData(localStorage.getItem('child_id')))
      console.log(response)
      this.items = response.data.data;
      this.totalRows = response.data.data.length
      this.backButton = buttonClick;
      this.pendingButton = true;
      this.completedButton = true;
      this.deletedButton = true;
      this.supervisorButton = true;

    },
    async buttonFilter(val, buttonClick) {
      this.backButton = true;
      const userData = this.$route.params.userID
      let response = (await myTaskAPI.getDataForFilter(localStorage.getItem('child_id'), val))
      console.log(response)
      this.items = response.data.data;
      this.totalRows = response.data.data.length
      switch (val) {
        case 1:
          this.pendingButton = buttonClick;
          this.completedButton = false;
          this.deletedButton = false;
          this.supervisorButton = false;
          break;
        case 2:
          this.pendingButton = false;
          this.completedButton = false;
          this.deletedButton = buttonClick;
          this.supervisorButton = false;
          break;
        case 3:
          this.pendingButton = false;
          this.completedButton = buttonClick;
          this.deletedButton = false;
          this.supervisorButton = false;
          break;
        case 4:
          this.pendingButton = false;
          this.completedButton = false;
          this.deletedButton = false;
          this.supervisorButton = buttonClick;
          break;

      }
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
    async getAllTask() {

      let response = (await myTaskAPI.getData(localStorage.getItem('child_id')))
      console.log(response)
      this.items = response.data.data;
      this.totalRows = response.data.data.length
    },
    async deleteResource(userID, taskID) {
      const userData = getUserData()
      await myTaskAPI.deleteBySupervisor(userData.id, taskID)
          .then((res) => {
            console.log('deleted')
            this.makeToast('Removed successfully', 'success');
            // toast("Order removed successfully", "success");
            this.getAllTask()
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger');
          })
    },
    async updateNotApplicable(userID, taskID) {
      const userData = getUserData()
      await myTaskAPI.updateNotApplicable(userData.id, taskID, 2)
          .then((res) => {
            this.makeToast('Updated successfully', 'success');
            this.getAllTask()
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger');
          })
    },
    async revertBySupervisor(userID, taskID) {
      const userData = getUserData()
      await myTaskAPI.revertBySupervisor(userData.id, taskID)
          .then((res) => {
            console.log('deleted')
            this.makeToast('Revert successfully', 'success');
            // toast("Order removed successfully", "success");
            this.getAllTask()
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger');
          })
    },
    async updateEResourceStatus(data, status, updated_user) {
      const userData = getUserData()
      await eResourcesAPI.updateStatus(data, status, userData.id)
          .then((res) => {
            console.log('update')
            this.makeToast('Status Update successfully', 'success');
            // toast("Order removed successfully", "success");
            this.getAllEResources()
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger');
          })
      // axios.put("http://13.232.138.190:8081/resource/update-eresource-status", null,
      //     { params: { data, status, updated_user }})
      //     .then(response => this.$router.go());
    },
  },
}
</script>
