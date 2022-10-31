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
                  <v-select
                      v-model="getRating"
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
import GoodTableBasic from "@/views/myTask/vue-good-table/GoodTableBasic";
/* eslint-disable */
export default {
  name: 'createResources',
  components: {
    BAvatar, BToast, BCol, BRow, BFormDatepicker, BFormTimepicker,
    GoodTableBasic,
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
      estimate: '',
      a: false,
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
      nextTodoId: 2,
      addEmployeePopupActive: false,
      dueTime: '',


      description: 'dsd',
      selfEvolution: '',
      comment: '',
      items: [{
        id: 1,
        name: 'test',
        prevHeight: 0,
      }],

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
    handleOk(bvModalEvt) {
      console.log(bvModalEvt)
      this.handleSubmit()
    },
    handleSubmit() {

      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
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
    addTask() {
      console.log("gggg")
      console.log(this.items)
      this.a = true;
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
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
      if (status === 1) {
        this.getStatus = this.status[0]
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

      this.post_values.estimate = data.estimate
    },

    async submit() {
      var task_id = this.$route.params.task_id
      var user_id = this.$route.params.user_id

      const payload = {
        rating: this.getRating.value,
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
