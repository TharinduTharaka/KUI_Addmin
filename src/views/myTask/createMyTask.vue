<template>
  <div>
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>

            <!-- Task Title -->
            <b-col cols="12">
              <b-form-group
                  label="Task Title"
                  label-for="v-title"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Task Title"
                    rules="required"
                >
                  <b-form-input
                      id="v-title"
                      v-model="title"
                      placeholder="Enter Task Title"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Priority -->
            <b-col cols="12">
              <b-form-group
                  label="Priority"
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

            <!-- Category -->
            <b-col cols="12">
              <b-form-group
                  label="Category"
                  label-for="v-category"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Category"
                    rules="required">
                  <v-select
                      v-model="getCategory"
                      :options="category"
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
                  label="Recurring"
                  label-for="v-recurring"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Recurring"
                    rules="required">
                  <v-select
                      v-model="getRecurring"
                      :options="recurring"
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

            <!-- Estimate -->
            <b-col cols="12">
              <b-form-group
                  label="Estimate"
                  label-for="v-estimate">
                <validation-provider
                    #default="{ errors }"
                    name="Estimate"
                    rules="required">
                  <b-form-input
                      id="v-estimate"
                      disabled
                      v-model="estimate"
                      placeholder="Enter Estimate"
                      type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Original Estimate -->
            <b-col cols="12">
              <b-form-group
                  label="Original Estimate"
                  label-for="v-originalEstimate"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Original Estimate"
                    rules="required"
                >
                  <b-form-input
                      id="v-originalEstimate"
                      v-model="originalEstimate"
                      type="number"
                      placeholder="Enter Original Estimate"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!--             Start Date -->
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

<!--            &lt;!&ndash; Due Time &ndash;&gt;-->
<!--            <b-col cols="12">-->
<!--              <b-form-group-->
<!--                  label="Due Time"-->
<!--                  label-for="v-dueTime"-->
<!--              >-->
<!--                <validation-provider-->
<!--                    #default="{ errors }"-->
<!--                    name="Due Date"-->
<!--                    rules="required"-->
<!--                >-->
<!--                  <b-form-timepicker-->
<!--                      id="v-dueTime"-->
<!--                      v-model="post_values.dueTime"-->
<!--                      placeholder="Enter Due Time"-->
<!--                  />-->
<!--                  <small class="text-danger">{{ errors[0] }}</small>-->
<!--                </validation-provider>-->
<!--              </b-form-group>-->
<!--            </b-col>-->


            <!-- Label -->
            <b-col cols="12">
              <b-form-group
                  label="Label"
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
                  label="Task Description"
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

            <!-- Blocked Task -->
            <b-col cols="12">
              <b-form-group
                  label="Blocked Task"
                  label-for="v-department">
                <div>
                  <b-form
                      ref="form"
                      :style="{height: trHeight}"
                      class="repeater-form"
                      @submit.prevent="repeateAgain">

                    <!-- Row Loop -->
                    <b-row
                        v-for="(item, index) in items"
                        :id="item.id"
                        :key="item.id"
                        ref="row">

                      <!-- Item Name -->
                      <b-col md="12">
                        <b-form-input
                            v-if="a"
                            id="item-name"
                            v-model="item.name"
                            placeholder="Employee Name"
                            type="text"
                        />
                      </b-col>

                      <!-- Remove Button -->
                      <b-col v-if="a" md="12"
                             style="padding-top: 10px">
                        <b-button
                            v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                            variant="outline-danger"
                            @click="removeItem(index)"
                        >
                          <feather-icon
                              class="mr-25"
                              icon="XIcon"
                          />
                          <span>Delete</span>
                        </b-button>
                      </b-col>

                      <b-col cols="12">
                        <hr>
                      </b-col>
                    </b-row>

                  </b-form>
                </div>
                <b-button
                    v-b-modal.modal-select2
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    @click="addTask"
                >
                  <feather-icon
                      class="mr-25"
                      icon="PlusIcon"
                  />
                  <span>Add Task</span>
                </b-button>
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
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import vSelect from 'vue-select'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import {required} from '@validations'
import flatPickr from 'vue-flatpickr-component'
import {VueGoodTable} from 'vue-good-table'
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
import myTaskAPI from '@/api/my_task'
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
      priority: [
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
  methods: {
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
        user_id: userData.id,
        category_id: this.getCategory.value,
        recurring: this.getRecurring.title,
        task_title: this.title,
        task_description: this.taskDescription,
        priority:this.getPriority.title,
        end_date:this.dueDate,
        start_date:this.startDate,
        reporter_id: this.userID,
        label: this.label,
        estimate: this.estimate,
        original_estimate: this.originalEstimate,
        blocked_task: 1,
        last_updated_user: userData.id,
      }
      await myTaskAPI.create(payload)
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
