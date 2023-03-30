<template>
  <b-card>
<!--    <b-button-->
<!--        style="margin-bottom: 10px"-->
<!--        variant="primary"-->
<!--        @click="() => $router.push(`/apps/myTask/createMyTask`)"-->
<!--    >-->
<!--      Add-->
<!--    </b-button>-->
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
<!--        <b-col md="2">-->
<!--          <b-form-group>-->
<!--            <label>Today Task:</label>-->
<!--            <b-form-checkbox></b-form-checkbox>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col md="2">-->
<!--          <b-form-group>-->
<!--            <label>Pending Task:</label>-->
<!--            <b-form-checkbox></b-form-checkbox>-->
<!--          </b-form-group>-->
<!--        </b-col>-->

<!--        <b-col md="2">-->
<!--          <b-form-group>-->
<!--            <label>Completed Task:</label>-->
<!--            <b-form-checkbox></b-form-checkbox>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col md="2">-->
<!--          <b-form-group>-->
<!--            <label>Deleted Task:</label>-->
<!--            <b-form-checkbox></b-form-checkbox>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
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

        <template #cell(action)="row">

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-button
              size="sm"
              variant="primary"
              @click="getChildTask(row.item.id, row.item.givenName)">
            see more
          </b-button>
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
                <strong>Description : </strong>{{ row.item.taskDescription }}
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
                  @click="deleteResource(userID,5)">
                Delete
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
  /* eslint-disable */
  data() {
    return {
      userID: 1,
      pageLength: 30,
      pageOptions: [3, 5, 10],
      perPage: 30,
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      dir: false,

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
        'userId',
        'date',
        'taskCount',
        'totalEstimation',
        'status',

      ],
      /* eslint-disable global-require */
      items: [
        {
          id: "",
          nameInFull: "",
          givenName: '',
          email: "",
          nicNo: "",
          contactNo: "",
          pendingTask: "",
          deleteRequested: "",
          reviewNeeded: ""
        },
      ],
      /* eslint-disable global-require */
      status: [
        {
          1: 'Low',
          0: 'Good'
        },
        {
          1: 'light-danger',
          0: 'light-success'
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
    const userData = getUserData()
    this.userID = userData.id
    this.totalRows = this.items.length
    await this.getAllTask()
  },
  methods: {
    advanceSearch(val) {
      this.filter = val
    },
    onRowClick(params) {
      console.log(params)
    },
    getChildTask(user_id, user_name) {
      localStorage.setItem('child_id', JSON.stringify(user_id))
      localStorage.setItem('child_name', JSON.stringify(user_name))
      this.$router.push(`/apps/childTask`)
      return {}
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
      const userData = getUserData()
      let response = (await myTaskAPI.getDailyTaskCount(userData.id))
      console.log(response)
      this.items = response.data.data;
      this.totalRows = response.data.data.length
    },
    async deleteResource(userID, taskID) {
      await myTaskAPI.delete(userID, taskID)
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
    async updateEResourceStatus(data, status, updated_user) {
      await eResourcesAPI.updateStatus(data, status, updated_user)
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
