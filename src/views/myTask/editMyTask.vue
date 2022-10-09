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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      readonly
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
                      disabled
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>



            <!-- Self Evolution -->
            <b-col cols="12">
              <b-form-group
                  label="Self Evolution"
                  label-for="v-selfEvolution"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Self Evolution"
                    rules="required"
                >
                  <v-select
                      v-model="post_values.selfEvolution"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="model.departmentOptions"
                      placeholder="Please select"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- comment -->
            <b-col cols="12">
              <b-form-group
                  label="Comment"
                  label-for="v-comment"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Task Comment"
                    rules="required"
                >
                  <b-form-textarea
                      id="v-comment"
                      v-model="post_values.comment"
                      placeholder="Enter Comment"

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
import vSelect from 'vue-select'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import {required} from '@validations'
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
  BToast,
} from 'bootstrap-vue'
import eResourcesAPI from '@/api/e_resources'
/* eslint-disable */
export default {
  name: 'createResources',
  components: {
    BAvatar, BToast, BCol, BRow, BFormDatepicker, BFormTimepicker,
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
  /* eslint-disable */
  data() {
    return {
      file: '',
      id_back: '',
      doc: {
        resource_name: '',
        cover_name: ''
      },
      post_values: {
        weight: '22',
        dueTime: '',
        title: 'sdds',
        dueDate: '',
        startDate: '',
        description: 'dsd',
        selfEvolution:'',
        comment:''
      },
      items: [],
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
  setup() {
    return {
      required,
    }
  },
  async mounted() {
    await this.getAllData()
  },
  methods: {
    makeToast(msg, variant) {
      this.$bvToast.toast(`${msg}`, {
        title: `${variant || 'default'}`,
        variant,
        solid: false,
      })
    },
    validationForm() {
      this.$refs.simpleRules.validate()
          .then(success => {
            if (success) {
              this.submit()
            }
          })
    },

    async getAllData() {
      var id_val = this.$route.params.resources_id
      let response = (await eResourcesAPI.getResourceData(id_val))
      console.log(response)
      const data = response.data.data;
      this.post_values.title = data.items[0].title
      this.post_values.department = data.items[0].department
      this.post_values.type = data.items[0].type
      this.post_values.resource = data.items[0].resource
      this.post_values.author = data.items[0].author
      this.post_values.description = data.items[0].description
      this.totalRows = data.total

    },

    async submit() {
      var new_id = this.$route.params.resources_id
      await eResourcesAPI.update(this.post_values, new_id)
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
    }
  },
}

</script>

<style scoped>

</style>
