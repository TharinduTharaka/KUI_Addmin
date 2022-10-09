<template>
  <div>
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <!-- Increment Group ID -->
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
                      v-model="post_values.title"
                      placeholder="Enter Task Title"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Start Date -->
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
                  <b-form-input
                      id="v-startDate"
                      v-model="post_values.startDate"
                      placeholder="Title"
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
                      v-model="post_values.dueDate"
                      placeholder="Enter Due Time"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Due Time -->
            <b-col cols="12">
              <b-form-group
                  label="Due Time"
                  label-for="v-dueTime"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Due Date"
                    rules="required"
                >
                  <b-form-timepicker
                      id="v-dueTime"
                      v-model="post_values.dueTime"
                      placeholder="Enter Due Time"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Weight -->
            <b-col cols="12">
              <b-form-group
                  label="Weight"
                  label-for="v-weight"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Enter Weight"
                    rules="required"
                >
                  <b-form-input
                      id="v-weight"
                      v-model="post_values.weight"
                      placeholder="Enter Weight"
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
                      v-model="post_values.description"
                      placeholder="Enter Task Description"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
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
import eResourcesAPI from '@/api/e_resources'
import Ripple from 'vue-ripple-directive'
import GoodTableBasic from './vue-good-table/GoodTableBasic'
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
      status: [{
        1: 'Current',
        2: 'Professional',
        3: 'Rejected',
        4: 'Resigned',
        5: 'Applied',
      },
        {
          1: 'light-primary',
          2: 'light-success',
          3: 'light-danger',
          4: 'light-warning',
          5: 'light-info',
        }],
      addEmployeePopupActive: false,
      items: [{
        id: 1,
        name: 'male',
        prevHeight: 0,
      }],
      nextTodoId: 2,
      file: '',
      id_back: '',
      doc: {
        resource_name: '',
        cover_name: ''
      },
      post_values: {
        weight: '',
        dueTime: '',
        title: '',
        dueDate: '',
        startDate: '',
        description: ''
      },
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
  created() {
    this.$http.get('/good-table/basic')
        .then(res => {
          this.rows = res.data
        })
  },
  setup() {
    return {
      required,
    }
  },
  methods: {
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

    validationForm() {
      this.$refs.simpleRules.validate()
          .then(success => {
            if (success) {

              this.submit()
            }
          })
    },
    async submit() {
      this.flipIn()
      await eResourcesAPI.create(this.post_values)
          .then((response) => {
            console.log('update')
            // toast("Order removed successfully", "success");
            this.submitFile(response)
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
          })
    },
    handleFileUpload(event) {
      this.model.file = event.target.files[0]
    },
    handleFileUploadCoverPhoto(event) {
      this.model.coverPhoto = event.target.files[0]
    },

    async submitFile(response) {
      var id = response.data.id
      let formData = new FormData()
      formData.append('files', this.model.file)
      formData.append('cover', this.model.coverPhoto)
      await eResourcesAPI.fileUpload(formData, id)
          .then(response => {
            this.$router.go(-1)
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
            console.log('FAILURE!!')
          })
    },
    flipIn() {
      this.$swal({
        title: 'Please wait uploading the document',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        showClass: {
          popup: 'animate__animated animate__flipInX',
        },
        buttonsStyling: false,
      })
    },
  },
}

</script>

<style scoped>

</style>
