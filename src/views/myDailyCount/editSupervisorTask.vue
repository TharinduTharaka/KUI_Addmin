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
                <b-form-input
                    id="v-title"
                    v-model="title"
                    disabled
                    placeholder="Enter Task Title"
                />
              </b-form-group>
            </b-col>

            <!-- Start Date -->
            <b-col cols="12">
              <b-form-group
                  label="Start Date"
                  label-for="v-startDate"
              >
                <b-form-input
                    id="v-startDate"
                    v-model="startDate"
                    disabled
                    placeholder="Title"
                />
              </b-form-group>
            </b-col>

            <!-- Due Date -->
            <b-col cols="12">
              <b-form-group
                  label="Due Date"
                  label-for="v-dueDate"
              >
                <b-form-input
                    id="v-dueDate"
                    v-model="dueDate"
                    disabled
                    placeholder="Enter Due Date"
                />
              </b-form-group>
            </b-col>

            <!-- Task  Description -->
            <b-col cols="12">
              <b-form-group
                  label="Task Description"
                  label-for="v-description"
              >
                <b-form-textarea
                    id="v-description"
                    v-model="taskDescription"
                    disabled
                    placeholder="Enter Task Description"
                />
              </b-form-group>
            </b-col>

            <!-- estimate -->
            <b-col cols="12">
              <b-form-group
                  label="Estimate"
                  label-for="v-estimate">
                <validation-provider
                    #default="{ errors }"
                    name="Enter Estimate"
                    rules="required">
                  <b-form-input
                      id="v-estimate"
                      v-model="estimate"
                      placeholder="Enter Estimate"

                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- rating -->
            <b-col cols="12">
              <b-form-group
                  label="Rating"
                  label-for="v-rating">
                <validation-provider
                    #default="{ errors }"
                    name="Enter Rating"
                    rules="required"
                >
                  <b-form-input
                      id="v-rating"
                      v-model="rating"
                      placeholder="Enter Rating"

                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Status -->
            <b-col cols="12">
              <b-form-group
                  label="Status"
                  label-for="v-status"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Status"
                    rules="required">
                  <v-select
                      v-model="getStatus"
                      :options="status"
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

            <!-- Rating comment -->
            <b-col cols="12">
              <b-form-group
                  label="Rating Comment"
                  label-for="v-comment"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Task Comment"
                    rules="required"
                >
                  <b-form-textarea
                      id="v-comment"
                      v-model="ratingComment"
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
import myTaskAPI from '@/api/my_task'
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
      title: '',
      getStatus: '',
      rating: '',
      estimate: '',
      taskDescription: '',
      dueDate: '',
      startDate: '',
      ratingComment: '',

      status: [
        {
          title: "Pending",
          value: 1
        },
        {
          title: "Completed",
          value: 3
        }

      ],
      file: '',
      id_back: '',
      doc: {
        resource_name: '',
        cover_name: ''
      },
      weight: '22',
      dueTime: '',


      description: 'dsd',
      selfEvolution: '',
      comment: '',
      items: [],

      model: {
        file: '',
        coverPhoto: '',
        resource: '',
        department: '',
        status: [
          {
            title: "Completed",
            value: 3
          },
          {
            title: "Pending",
            value: 1
          },
        ],
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
      var task_id = this.$route.params.task_id
      var user_id = this.$route.params.user_id
      let response = (await myTaskAPI.getTaskData(user_id, task_id))
      console.log(response);
      const data = response.data.data[0];
      this.title = data.taskTitle
      this.startDate = data.startDate
      this.dueDate = data.endDate
      this.taskDescription = data.taskDescription
      this.rating = data.rating
      this.ratingComment = data.ratingComment
      const status = data.status;
      if (status === 1) {
        this.getStatus = this.status[0]
      }
      this.post_values.estimate = data.estimate
    },

    async submit() {
      var task_id = this.$route.params.task_id
      var user_id = this.$route.params.user_id

      const payload = {
        rating: this.rating,
        rating_comment: this.ratingComment,
        estimate: this.estimate,
        status: this.getStatus.value
      }
      await myTaskAPI.update(payload, user_id, task_id)
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
