<template>
  <div>
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>

            <!-- employee Id-->
            <b-col cols="12">
              <b-form-group
                  label="Employee ID"
                  label-for="v-empId"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Employee ID"
                    rules="required"
                >
                  <b-form-input
                      id="v-empId"
                      readonly="true"
                      v-model="items.empId"
                      placeholder="Enter Employee ID"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Date -->
            <b-col cols="12">
              <b-form-group
                  label="Date"
                  label-for="v-date"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Enter Date"
                    rules="required"
                >
                  <b-form-datepicker
                      id="v-date"
                      readonly="true"
                      v-model="items.date"
                      placeholder="Enter Date"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                  label="Current In Time"
                  label-for="v-inTime"
              >

                <b-form-input
                    id="v-empId"
                    readonly="true"
                    v-model="items.inTime"
                    placeholder="Enter In Time"
                />

              </b-form-group>
            </b-col>


            <!--in time-->
            <b-col cols="12">
              <b-form-group

                  label-for="v-inTime"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Enter IN Time"
                    rules="required"
                >
                  <div v-if="items.inTime === '' || items.requestIssue === 3">
                    <b-time
                        v-model="items.inTimeNew"
                        show-seconds
                        locale="en"
                    />
                  </div>
                  <div v-else>
                    <b-time
                        v-model="items.inTimeNew"
                        show-seconds
                        readonly="true"
                        locale="en"
                    />
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                  label="Current Out Time"
                  label-for="v-inTime"
              >
<!--                <validation-provider-->
<!--                    #default="{ errors }"-->
<!--                    name="In Time"-->
<!--                    rules="required"-->
<!--                >-->
                  <b-form-input
                      id="v-empId"
                      readonly="true"
                      v-model="items.outTime"
                      placeholder="Enter In Time"
                  />
<!--                  <small class="text-danger">{{ errors[0] }}</small>-->
<!--                </validation-provider>-->
              </b-form-group>
            </b-col>


            <!--in time-->
            <b-col cols="12">
              <b-form-group

                  label-for="v-outTime"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Enter IN Time"
                    rules="required"
                >
                  <div v-if="items.outTime === '' || items.requestIssue === 3">
                    <b-time
                        v-model="items.outTimeNew"
                        show-seconds
                        locale="en"
                    />

                  </div>
                  <div v-else>
                    <b-time
                        v-model="items.outTime"
                        show-seconds
                        readonly="true"
                        locale="en"
                    />

                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Comment -->
            <b-col cols="12">
              <b-form-group
                  label="Comment"
                  label-for="v-comment"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Comment"
                    rules="required"
                >
                  <b-form-textarea
                      id="v-comment"
                      v-model="items.comment"
                      placeholder="Enter Comment"
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
            block
            class="mt-3"
            variant="outline-secondary"
            @click="hideModal"
        >
          Close Me
        </b-button>
        <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            block
            class="mt-2"
            variant="outline-primary"
            @click="toggleModal"
        >
          Toggle Me
        </b-button>
      </b-modal>

    </b-card>
  </div>


</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import vSelect from 'vue-select'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import {required} from '@validations'
import flatPickr from 'vue-flatpickr-component'
import {VueGoodTable} from 'vue-good-table'
import { BTime } from 'bootstrap-vue'
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
import attendance from '@/api/Attendance'
import Ripple from 'vue-ripple-directive'
import GoodTableBasic from './vue-good-table/GoodTableBasic'
import {getUserData} from "@/auth/utils";
/* eslint-disable */
export default {
  name: 'createMyTask',
  components: {
    BTime,flatPickr, BCol, BRow, BFormDatepicker, BFormTimepicker,
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
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  /* eslint-disable */
  data() {
    return {
      userID: 1,
      value: '',
      empId: '',
      date: '',
      inTime: '',
      requestIssue: 0,
      outTime: '',
      type: '',
      comment: '',
      approvedBy: '',
      approvedDate: '',

      getCategory: {},
      getRecurring: {},
      getPriority: {},

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
      typeList: [
        {
          title: "High",
        },
        {
          title: "Medium",
        },
        {
          title: "Low",
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
      items: {
        empId: 1,
        date : null,
        inTime : '',
        inTimeNew : '',
        outTime : '',
        outTimeNew : '',
        comment : ''

      },

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
      }
    }
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
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length

    await this.getAttendance()
  },
  methods: {
    async getAttendance() {
      let response = (await attendance.getAllAttendanceByAttendanceData(this.$route.params.id))
      console.log(response)
      this.items = response.data.data;

      console.log("items", this.items )
      this.totalRows = response.data.data.length
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
        inTime: this.items.inTime,
        inTimeNew: this.items.inTimeNew,
        outTime: this.items.outTime,
        outTimeNew: this.items.outTimeNew,
        comment: this.items.comment,
        requestIssue: this.items.requestIssue,
      }
      await attendance.create(this.$route.params.id, payload)
          .then((response) => {
            console.log('update')
            this.makeToast(' Update successfully', 'success');
            // toast("Order removed successfully", "success");
            this.$router.go(-1)
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
