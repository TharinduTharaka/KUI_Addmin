<template>

  <b-card-code title="Repeating Forms">

    <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="success"
        @click="repeateAgain"
    >
      <span>Submit My Leaves</span>
    </b-button>
    <br>
    <br>
    <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        @click="repeateAgain"
    >
      <feather-icon
          icon="PlusIcon"
          class="mr-25"
      />
      <span>Add New</span>
    </b-button>
    <br>
    <br>
    <br>
    <div>
      <b-form
        ref="form"
        :style="{height: trHeight}"
        class="repeater-form"
        @submit.prevent="repeateAgain"
      >

        <!-- Row Loop -->
        <b-row
          v-for="(item, index) in items"
          :id="item.id"
          :key="item.id"
          ref="row"
        >

          <!-- Item Name -->
          <b-col md="4">
            <b-form-group
              label="Leave Type"
              label-for="item-name"
            >
              <v-select
                  v-model="getCategory"
                  :options="category"
                  label="title"
                  placeholder="Please select">
                <template slot="option" slot-scope="option">
                  <span>{{ option.title }}</span>
                </template>
              </v-select>
            </b-form-group>
          </b-col>


          <b-col md="4">
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
                    placeholder="Enter Due Time"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Cost -->
          <b-col md="2">
            <b-form-group
              label="Cost"
              label-for="cost"
            >
              <b-form-input
                id="cost"
                type="number"
                placeholder="32"
              />
            </b-form-group>
          </b-col>

          <!-- Quantity -->
          <b-col md="2">
            <b-form-group
              label="Quantity"
              label-for="quantity"
            >
              <b-form-input
                id="quantity"
                type="number"
                placeholder="1"
              />
            </b-form-group>
          </b-col>

          <!-- Profession -->
          <b-col
            lg="2"
            md="1"
          >
            <b-form-group
              label="Pricee"
              label-for="price"
            >
              <b-form-input
                id="pzrice"
                value="32$"
                plaintext
              />
            </b-form-group>
          </b-col>

          <!-- Remove Button -->
          <b-col
            lg="2"
            md="3"
            class="mb-50"
          >
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-danger"
              class="mt-0 mt-md-2"
              @click="removeItem(index)"
            >
              <feather-icon
                icon="XIcon"
                class="mr-25"
              />
              <span>Delete</span>
            </b-button>
            <br>
            <br>
            <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="repeateAgain"
            >
              <feather-icon
                  icon="PlusIcon"
                  class="mr-25"
              />
              <span>Add New</span>
            </b-button>
          </b-col>
          <b-col cols="12">
            <hr>
          </b-col>

        </b-row>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
      </b-form>
    </div>

    <template #code>
      {{ codeBasic }}
    </template>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import {
  BForm, BFormGroup, BFormInput, BRow, BCol, BButton,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import { codeBasic } from './code'
import vSelect from "vue-select";
import {ValidationProvider} from "vee-validate";

export default {
  components: {
    BCardCode,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    vSelect,
    ValidationProvider,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      items: [{
        id: 1,
        selected: 'male',
        selected1: 'designer',
        prevHeight: 0,
      }],
      nextTodoId: 2,
      getCategory: {},
      codeBasic,
      category: [
        {
          title: "Annual",
          value: 1
        },
        {
          title: "Casual",
          value: 2
        },
        {
          title: "Lieu Leave",
          value: 3
        },
        {
          title: "Special",
          value: 4
        },
        {
          title: "Probation Half Day",
          value: 5
        },
        {
          title: "Short Leave",
          value: 6
        },
        {
            title: "Minor Staff - Monthly",
          value: 7
        },
        {
            title: "Cleaning Staff",
          value: 8
        }

      ],
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    repeateAgain() {
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
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
