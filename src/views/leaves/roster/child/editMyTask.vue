<template>
  <div>
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <!-- Increment Group ID -->
            <b-col cols="12">
              <b-form-group
                  label="Title"
                  label-for="v-title"
              >
                <b-form-input
                    id="v-title"
                    v-model="title"
                    disabled
                    placeholder="Enter Title"
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
                  label="Description"
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
                      v-model="userList"
                      multiple
                      :close-on-select="false"
                      :options="userListFromApi"
                      label="name"
                      input-id="add-guests"
                  >

                    <template #option="{ avatar, name }">
                      <b-avatar
                          size="sm"
                          :src="avatar"
                      />
                      <span class="ml-50 align-middle"> {{ name }}</span>
                    </template>

                    <template #selected-option="{ avatar, name }">
                      <b-avatar
                          size="sm"
                          class="border border-white"
                          :src="avatar"
                      />
                      <span class="ml-50 align-middle"> {{ name }}</span>
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Rating comment -->
            <b-col cols="12">
              <b-form-group
                  label="Reason"
                  label-for="v-comment"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Rueason"
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
          ok-disabled
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
import myRosterAPI from '@/api/roster'
import rosterAPI from '@/api/roster'
import GoodTableBasic from "@/views/myTask/vue-good-table/GoodTableBasic";
import {getUserData} from "@/auth/utils";
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
      userList: [],
      userListFromApi: [],
      title: '',
      getStatus: '',
      getRating: '',
      estimate: '',
      totalEstimate: 0,
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
      this.a = true;
    },
    async getUserList() {
      let response = (await rosterAPI.getRosterUserList(1, 1))

      this.userListFromApi = response.data.data
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
    async getTotalEstimate() {
      let response = (await myTaskAPI.getEstimateBreakDown(this.$route.params.task_id))
      console.log(response)
      this.totalEstimate = response.data.data.total;
    },
    async getAllData() {
      var task_id = this.$route.params.task_id
      const userData = getUserData()
      var user_id = userData.id
      let response = (await myRosterAPI.getRosterForId(user_id, task_id))
      const data = response.data.data;
      this.title = data.title
      this.startDate = data.start
      this.dueDate = data.end
      this.taskDescription = data.description
      this.estimate = data.estimate
      this.ratingComment = data.ratingComment
      const status = data.status;
      await this.getUserList()
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
      await rosterAPI.changeUser(task_id,user_id,this.userList,this.ratingComment)
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
