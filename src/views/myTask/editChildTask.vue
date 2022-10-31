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
                      disabled
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

                  <v-select
                      v-model="getRating"
                      disabled
                      :options="rating"
                      label="title"
                      placeholder="Please select">
                    <template slot="option" slot-scope="option">
                      <span>{{ option.title }}</span>
                    </template>
                  </v-select>

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
                      disabled
                      v-model="ratingComment"
                      placeholder="Enter Comment"

                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>




            <b-col cols="12">
              <b-form-group
                  label="Supervisor Rating"
                  label-for="v-rating">
                <validation-provider
                    #default="{ errors }"
                    name="Enter Supervisor Rating"
                    rules="required"
                >
                  <v-select
                      v-model="getSupervisorRating"
                      :options="rating"
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
                  label="Supervisor Rating Comment"
                  label-for="v-comment"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Supervisor Task Comment"
                    rules="required"
                >
                  <b-form-textarea
                      id="v-comment"
                      v-model="supervisorRatingComment"
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
<!--              <b-button-->
<!--                  size="sm"-->
<!--                  type="reset"-->
<!--                  variant="outline-secondary"-->
<!--              >-->
<!--                Reset-->
<!--              </b-button>-->
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
      getRating: '',
      getSupervisorRating: '',
      estimate: '',
      taskDescription: '',
      dueDate: '',
      startDate: '',
      ratingComment: '',
      supervisorRatingComment: '',

      status2: [
        {
          title: "Pending",
          value: 1
        },
        {
          title: "Deleted",
          value: 2
        },
        {
          title: "Completed",
          value: 3
        },
        {
          title: "Supervisor Deleted",
          value: 4
        },
        {
          title: "Supervisor Completed",
          value: 5
        }
      ],

      status: [
        {
          title: "Supervisor Completed",
          value: 5
        }
      ],
      rating: [
        {
          title: "Unacceptable",
          value: 1
        },
        {
          title: "Inconsistent",
          value: 2
        },
        {
          title: "Successful",
          value: 3
        },
        {
          title: "Exceeds Expectations",
          value: 4
        },
        {
          title: "Exceptional",
          value: 5
        },
        {
          title: "Not Applicable",
          value: 6
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
      console.log(task_id);
      const data = response.data.data[0];
      this.title = data.taskTitle
      this.startDate = data.startDate
      this.dueDate = data.endDate
      this.taskDescription = data.taskDescription
      this.estimate = data.estimate
      this.ratingComment = data.ratingComment
      const status = data.status;
      const rating = data.rating;
      const supervisorRating = data.supervisorRating;
      this.supervisorRatingComment = data.supervisorComment;
      if (status === 1) {
        this.getStatus = this.status2[0]
      }
      else if (status === 2) {
        this.getStatus = this.status2[1]
      }
      else if (status === 3) {
        this.getStatus = this.status2[2]
      }
      else if (status === 4) {
        this.getStatus = this.status2[3]
      }

      if (rating === 1) {
        this.getRating = this.rating[0]
      }
      else if (rating === 2) {
        this.getRating = this.rating[1]
      }
      else if (rating === 3) {
        this.getRating = this.rating[2]
      }
      else if (rating === 4) {
        this.getRating = this.rating[3]
      }
      else if (rating === 5) {
        this.getRating = this.rating[4]
      }

      if (supervisorRating === 1) {
        this.getSupervisorRating = this.rating[0]
      }
      else if (supervisorRating === 2) {
        this.getSupervisorRating = this.rating[1]
      }
      else if (supervisorRating === 3) {
        this.getSupervisorRating = this.rating[2]
      }
      else if (supervisorRating === 4) {
        this.getSupervisorRating = this.rating[3]
      }
      else if (supervisorRating === 5) {
        this.getSupervisorRating = this.rating[4]
      }

      this.post_values.estimate = data.estimate
    },

    async submit() {
      var task_id = this.$route.params.task_id
      var user_id = this.$route.params.user_id

      const payload = {
        supervisor_rating: this.getSupervisorRating.value,
        supervisor_comment: this.supervisorRatingComment,
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
