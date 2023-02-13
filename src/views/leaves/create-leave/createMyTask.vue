<template>


  <div>



    <b-card>
      <validation-observer ref="simpleRules">


        <template #code>
          {{ codeBasic }}
        </template>
        <b-form>
          <b-row>


            <!-- Priority -->
            <b-col cols="12">
              <b-form-group
                  label="Leave Type"
                  label-for="v-category"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Category"
                    rules="required">
                  <v-select
                      v-model="getPriority"
                      :options="priority"
                      label="title"
                      placeholder="Please select">
                    <template slot="option" slot-scope="option">
                      <span>{{ option.title }}</span>
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                  label="Start Date"
                  label-for="v-startDate"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Enter Start Date"
                    rules="required"
                >
                  <b-form-datepicker
                      id="v-startDate"
                      v-model="startDate"
                      placeholder="Enter Due Time"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Due Date -->
            <b-col cols="12">
              <b-form-group
                  label="Due Date"
                  label-for="v-dueDate"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Enter Due Date"
                    rules="required"
                >
                  <b-form-datepicker
                      id="v-dueDate"
                      v-model="dueDate"
                      placeholder="Enter Due Time"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Label -->
            <b-col cols="12">
              <b-form-group
                  label="Total Leaves"
                  label-for="v-label"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Enter Label"
                    rules="required"
                >
                  <b-form-input
                      id="v-label"
                      v-model="label"
                      placeholder="Enter Label"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Task  Description -->
            <b-col cols="12">
              <b-form-group
                  label="Comment"
                  label-for="v-description"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Task Description"
                    rules="required"
                >
                  <b-form-textarea
                      id="v-description"
                      v-model="taskDescription"
                      placeholder="Enter Task Description"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- submit and reset button -->
            <b-col cols="12">
              <b-button
                  class="mr-1"
                  size="sm"
                  type="submit"
                  variant="primary"
                  @click.prevent="validationForm"
              >
                Submit
              </b-button>
              <b-button
                  size="sm"
                  type="reset"
                  variant="outline-secondary"
              >
                Reset
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
      <b-modal
          id="modal-select2"
          cancel-variant="outline-secondary"
          centered
          ok-title="submit"
          size="lg"
          title="Employee List"
          @ok="handleOk"
      >
        <good-table-basic/>
      </b-modal>


      <b-modal
          ref="my-modal"
          hide-footer
          title="Using Component Methods"
      >
        <div class="d-block text-center">
          <h3>Hello From My Modal!</h3>
        </div>
        <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            class="mt-3"
            variant="outline-secondary"
            block
            @click="hideModal"
        >
          Close Me
        </b-button>
        <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            class="mt-2"
            variant="outline-primary"
            block
            @click="toggleModal"
        >
          Toggle Me
        </b-button>
      </b-modal>

    </b-card>
  </div>



</template>

<script>

import vSelect from 'vue-select'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import {required} from '@validations'
import flatPickr from 'vue-flatpickr-component'
import {VueGoodTable} from 'vue-good-table'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { BTable } from 'bootstrap-vue'
import { codeBasic } from '../code2'
import leaveAPI from "@/api/leave_ui";
import {
  BAvatar,
  BButton,
  BCard,
  BCardText,
  BCol,
  BForm,
  BFormCheckbox,
  BFormDatepicker,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormTimepicker,
  BListGroup,
  BListGroupItem,
  BRow,
  VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import GoodTableBasic from './vue-good-table/GoodTableBasic'
import {getUserData} from "@/auth/utils";
/* eslint-disable */
export default {
  name: 'createMyTask',
  components: {
    flatPickr, BCol, BRow, BFormDatepicker, BFormTimepicker,
    BCardCode, VueGoodTable, GoodTableBasic,
    BAvatar,
    ValidationProvider,
    ValidationObserver,
    BFormTextarea,
    BButton,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BFormFile,
    BListGroup,
    BListGroupItem,
    BCardText,
    BCard,
    vSelect,
    BTable
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  /* eslint-disable */
  data() {
    return {
      userID: 1,
      categoryID: '',
      title: '',
      label: '',
      taskDescription: '',
      reporterID: '',
      estimate: '0',
      originalEstimate: '',
      blockedTask: '',
      lastUpdatedUser: '',
      getCategory: null,
      getRecurring: null,
      getPriority: null,

      dateNtim: null,
      pageLength: 3,
      dir: false,
      columns: [
        {
          label: 'Name',
          field: 'fullName',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Date',
          field: 'startDate',
        },
        {
          label: 'Salary',
          field: 'salary',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
      priority: [
        {
          title: "Annual",
        },
        {
          title: "Casual - Accident or vehicle breakdown",
        },
        {
          title: "Casual - Police or court appearance",
        },
        {
          title: "Casual - Funeral",
        },
        {
          title: "Casual - Sudden Illness",
        },
        {
          title: "Day Off - Feb",
        },
        {
          title: "Lieu Leave",
        },
        {
          title: "Special",
        },
        {
          title: "Probation Half Day",
        },
        {
          title: "Short Leave",
        },
        {
          title: "Minor Staff Monthly",
        },
        {
          title: "Cleaning Staff",
        }
      ],
      recurring: [
        {
          title: "Ad-hoc",
        },
        {
          title: "Daily",
        },
        {
          title: "Weekly",
        },
        {
          title: "Monthly",
        }
      ],
      category: [
        {
          title: "Category1",
          value: 1
        },
        {
          title: "Category2",
          value: 2
        },
        {
          title: "Category3",
          value: 3
        }

      ],
      addEmployeePopupActive: false,
      a: false,
      items: [{
        id: 1,
        name: 'test',
        prevHeight: 0,
      }],

      nextTodoId: 2,
      file: '',
      id_back: '',
      doc: {
        resource_name: '',
        cover_name: ''
      },
      weight: '',
      dueTime: '',

      dueDate: '',
      startDate: '',


      model: {
        file: '',
        coverPhoto: '',
        resource: '',
        department: '',
        departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Marketing', 'Acupuncture', 'IT', 'HR', 'Accounting'],
        type: ['Book', 'Journal', 'Magazine', 'PDF', 'Article'],
        resourceOptions: ['Thesis', 'General'],
        option: [{title: 'Square'}, {title: 'Rectangle'}, {title: 'Rombo'}, {title: 'Romboid'}],
      },
      items2: [

      ],
      codeBasic,
    }
  },

  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    await this.getAllAvailableLeaves()
  },

  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current: 'light-primary',
        Professional: 'light-success',
        Rejected: 'light-danger',
        Resigned: 'light-warning',
        Applied: 'light-info',
        /* eslint-enable key-spacing */
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
  // created() {
  //   this.$http.get('/good-table/basic')
  //       .then(res => {
  //         this.rows = res.data
  //       })
  // },
  setup() {
    return {
      required,
    }
  },
  methods: {

    async getAllAvailableLeaves() {
      const userData = getUserData()
      let response = (await leaveAPI.getLeaveBalance(userData.id))
      console.log(response)
      this.items2 = response.data.data
    },

    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    addTask() {
      this.a = true;
    },
    handleOk(bvModalEvt) {
      console.log(bvModalEvt)
      // Prevent modal from closing
      // bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {

      // Push the name to submitted names
      // this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
    },
    repeateAgain() {
      this.addEmployeePopupActive = true;
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },

    makeToast(msg, variant) {
      this.$bvToast.toast(`${msg}`, {
        title: `${variant || 'default'}`,
        variant,
        solid: false,
      })
    },

    validationForm() {
      // this.showModal()
      this.$refs.simpleRules.validate()
          .then(success => {
            if (success) {
              this.submit()
            }
          })
    },
    async submit() {
      const userData = getUserData()
      const payload = {
        leave_type:this.getPriority.title,
        start_date:this.startDate,
        end_date:this.dueDate,
        total: this.label,
        description: this.taskDescription
      }
      await leaveAPI.create(userData.id,payload)
          .then((response) => {
            console.log(response.data.code)
            if (response.data.code == 201){
              this.makeToast(response.data.msg, 'danger');
            }
            else {

              this.$router.push(`/apps/leaves`)
            }
            // toast("Order removed successfully", "success");
            //this.$router.go(-1)
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
          })
    },

  },
}

</script>

<style scoped>

</style>
