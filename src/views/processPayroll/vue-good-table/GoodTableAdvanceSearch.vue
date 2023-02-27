<template>
  <b-card>

    <b-row>
      <b-col>
        <b-button
            v-if="isSupervisorPendingCount > 0"
            style="margin-bottom: 10px"
            variant="primary"
            @click="() => $router.push(`/apps/supervisorTask`)"
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
          <b-button
              block
              variant="primary"
              @click="buttonFilter(1,true)"
          >
            Process OT
          </b-button>
        </b-col>
        <b-col md="2" style="padding-top: 10px" v-if="completedButton">
          <b-button
              block
              variant="success"
              @click="buttonFilter(3,true)"
          >
            Process No Pay
          </b-button>
        </b-col>
        <b-col md="2" style="padding-top: 10px" v-if="deletedButton">
          <b-button
              block
              variant="danger"
              @click="buttonFilter(2,true)"
          >
            Process Salary
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
        <template #cell(action2)="row">
          <b-button
              v-if="row.item.isNoPayBasic ===1"
              size="sm"
              style="margin-left: 10px"
              variant="outline-success"
              @click="updateEResourceStatus(row.item.id,2)">
            No Pay From Gross
          </b-button>
          <b-button
              v-if="row.item.isNoPayBasic ===0"
              size="sm"
              style="margin-left: 10px"
              variant="outline-info"
              @click="updateEResourceStatus(row.item.id,2)">
            No Pay From Basic
          </b-button>
        </template>
        <template #cell(action3)="row">
          <b-button
              v-if="row.item.isOtBasic ===1"
              size="sm"
              style="margin-left: 10px"
              variant="outline-success"
              @click="updateEResourceStatus(row.item.id,1)">
            OT From Gross
          </b-button>
          <b-button
              v-if="row.item.isOtBasic ===0"
              size="sm"
              style="margin-left: 10px"
              variant="outline-info"
              @click="updateEResourceStatus(row.item.id,1)">
            OT From Basic
          </b-button>
        </template>
        <!-- full detail on click -->
        <template #row-details="row">
          <b-card>



            <b-row class="mb-2">
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Advance : </strong>{{ row.item.taskTitle }}
                <b-form-input
                    id="v-estimate"
                    v-model="advance"
                    placeholder="Enter Advance Value"

                />
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
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-primary"
                  @click="addAdvance(row.item.id)"
              >
                Add Advance
              </b-button>


              <b-button
                  v-if="row.item.notApplicable ===0"
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-success"
                  @click="updateEResourceStatus(row.item.id,3)">
                Not Applicable
              </b-button>
              <b-button
                  v-if="row.item.notApplicable ===1"
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-danger"
                  @click="updateEResourceStatus(row.item.id,3)">
                Re Activate
              </b-button>
            </div>
          </b-card>
        </template>

        <template #cell(isNoPay)="data">
          <b-badge :variant="isNoPay[1][data.value]">
            {{ isNoPay[0][data.value] }}
          </b-badge>
        </template>

        <template #cell(isOt)="data">
          <b-badge :variant="isOt[1][data.value]">
            {{ isOt[0][data.value] }}
          </b-badge>
        </template>

        <template #cell(isActive)="data">
          <b-badge :variant="isActive[1][data.value]">
            {{ isActive[0][data.value] }}
          </b-badge>
        </template>

        <template #cell(isOtBasic)="data">
          <b-badge :variant="isOtBasic[1][data.value]">
            {{ isOtBasic[0][data.value] }}
          </b-badge>
        </template>

        <template #cell(isNoPayBasic)="data">
          <b-badge :variant="isNoPayBasic[1][data.value]">
            {{ isNoPayBasic[0][data.value] }}
          </b-badge>
        </template>
        <template #cell(notApplicable)="data">
          <b-badge :variant="notApplicable[1][data.value]">
            {{ notApplicable[0][data.value] }}
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
          class="mt-3"
          variant="outline-secondary"
          block
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
import profileAPI from '@/api/profile'
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
      backButton: false,
      pendingButton: true,
      completedButton: true,
      deletedButton: true,
      supervisorButton: true,
      downImg: require('@/assets/images/pages/coming-soon.svg'),
      userID: 1,
      pageLength: 5,
      pageOptions: [3, 5, 10],
      perPage: 50,
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      dir: false,
      advance: 0,
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
      rows: [],
      searchTerm: '',
      isSupervisorPendingCount: 0,
      newFeatureAlertCheckCount: 0,
      fields: [
        'show_details',
        'id',
        {
          key: 'notApplicable',
          label: 'Is Applicable'

        },
        'name',
        'action2',
        {
          key: 'isNoPayBasic',
          label: 'Is No Pay From Basic'

        },
        'action3',
        {
          key: 'isOtBasic',
          label: 'Is Ot From Basic'

        },
        'advance',
        'empId',
        'serialId',
        'basicSalary',
        {
          key: 'isNoPay',
          label: 'Is No Pay'

        },
        {
          key: 'isOt',
          label: 'Is Ot'

        },
        'applicableDates',
        'totalOt',
        'totalNoPay',
        'action'
      ],
      /* eslint-disable global-require */
      items: [
        {
          taskTitle: "",
          startDate: "",
          endDate: '',
          status: "",
          estimate: "",
          isNoPayBasic: 0,
          notApplicable: 1,
          isOtBasic: 0,

          id: "",
          payrollId: "",
          empId: '',
          serialId: "",
          name: "",
          isNoPay: "",
          isOt: "",
          advance: "",
          isActive: "",
          applicableDates: ""
        },
      ],
      /* eslint-disable global-require */
      isNoPay: [
        {
          1: 'Activate',
          0: 'Deactivate'
        },
        {
          1: 'light-primary',
          0: 'light-danger',
        }
      ],
      isOt: [
        {
          1: 'Activate',
          0: 'Deactivate'
        },
        {
          1: 'light-primary',
          0: 'light-danger',
        }
      ],
      notApplicable: [
        {
          1: 'Disable',
          0: 'Enable'
        },
        {
          1: 'light-danger',
          0: 'light-primary',
        }
      ],
      isActive: [
        {
          1: 'Activate',
          0: 'Deactivate'
        },
        {
          1: 'light-primary',
          0: 'light-danger',
        }
      ],
      isOtBasic: [
        {
          1: 'Basic',
          0: 'Gross'
        },
        {
          1: 'light-success',
          0: 'light-info'
        }
      ],
      isNoPayBasic: [
        {
          1: 'Basic',
          0: 'Gross'
        },
        {
          1: 'light-success',
          0: 'light-info'
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
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/coming-soon-dark.svg')
        return this.downImg
      }
      return this.downImg
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
  async mounted() {
    const userData = getUserData()
    this.userID = userData.id
    this.totalRows = this.items.length

    await this.getAllTask()
  },
  methods: {
    async backButtonClick(buttonClick) {
      const userData = getUserData()
      let response = (await myTaskAPI.getData(userData.id))
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
      const userData = getUserData()
      let response = (await myTaskAPI.getDataForFilter(userData.id, val))
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
      let response = (await myTaskAPI.getPayrollAllConfig(1))
      console.log(response)
      this.items = response.data.data;
      this.totalRows = response.data.data.length
    },
    async deleteResource(userID, taskID) {
      const userData = getUserData()
      await myTaskAPI.delete(userData.id, taskID)
          .then((res) => {
            this.makeToast('Removed successfully', 'success');
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
      await myTaskAPI.updateNotApplicable(userData.id, taskID, 1)
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
    async addAdvance(id) {
      await myTaskAPI.addAdvance(id, this.advance)
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
    async getIsSupervisorReviewCount() {
      const userData = getUserData()
      let response = (await myTaskAPI.getIsSupervisorPendingTaskCount(userData.id))
      this.isSupervisorPendingCount = response.data.data;
    },
    async updateEResourceStatus(id,status) {
      await myTaskAPI.updateStatus(id, status)
          .then((res) => {
            console.log('update')
            this.makeToast('Status Update successfully', 'success');
            // toast("Order removed successfully", "success");
            this.getAllTask()
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
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
      this.$router.push(`/apps/supervisorTask`)
    },

    showNewFeature() {
      this.$refs['my-modal-new-feature'].show()
    },
    hideNewFeatureModal() {
      this.$refs['my-modal-new-feature'].hide()
      this.$router.push(`/pages/profile`)
    },

    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
