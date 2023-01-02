<template>
  <b-card-code

    no-body
  >
    <b-table
      :fields="fields"
      :items="items"
      responsive
      class="mb-0"
    >

      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(leaveType)="data">
        <b-badge
            pill
            :variant="data.value.object3"
        >
          {{ data.value.object2 }}
        </b-badge>
      </template>

      <template #cell(remainingPercentage)="data">
        <b-progress
            :value="data.value.object1"
            max="100"
            height="7px"
            :variant="data.value.object2"
            striped
        />
      </template>

      <!-- A custom formatted column -->
      <template #cell(name)="data">
        <span class="text-nowrap">{{ data.value.first+' - '+ data.value.last }}</span>
      </template>

      <!-- A custom formatted column -->
      <template #cell(Popularity)="data">
        <b-progress
          :value="data.value.value"
          max="100"
          height="7px"
          :variant="data.value.variant"
          striped
        />
      </template>

      <template #cell(order_status)="data">
        <b-badge
          pill
          :variant="data.value.variant"
        >
          {{ data.value.status }}
        </b-badge>
      </template>

      <!-- A virtual composite column -->
      <template #cell(price)="data">
        {{ '$'+data.value }}
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        {{ data.value }}
      </template>
    </b-table>

    <template #code>
      {{ codeDataRendering }}
    </template>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { BTable, BProgress, BBadge } from 'bootstrap-vue'
import { codeDataRendering } from './code'
import leaveAPI from "@/api/leave_ui"
import {getUserData} from "@/auth/utils";

export default {
  components: {
    BCardCode,
    BTable,
    BProgress,
    BBadge,
  },
  data() {
    return {
      fields: [

        'index',
        { key: 'leaveType', label: 'Leave Type' },
        { key: 'leaves', label: 'Available Leaves' },
        { key: 'originalLeave', label: 'Original Leaves' },
        { key: 'remainingPercentage', label: 'Remaining Percentage ' }
      ],
      items: [
        {
          name: { first: 'Fitbit', last: 'Activity Tracker' },
          Category: 'Fitness',
          order_status: { status: 'Delivered', variant: 'success' },
          Popularity: { value: 50, variant: 'success' },
          price: 99.99,
        },
        {
          name: { first: 'Fitbit ', last: 'Flex Wireless Activity' },
          Category: 'Fitness',
          order_status: { status: 'Pending', variant: 'primary' },
          Popularity: { value: 36, variant: 'primary' },
          price: 89.85,
        },
        {
          name: { first: 'Fitbit', last: 'Sleep Tracker Wristband' },
          Category: 'Fitness',
          order_status: { status: 'Delivered', variant: 'success' },
          Popularity: { value: 76, variant: 'success' },
          price: 65.25,
        },
        {
          name: { first: 'Fitbit', last: 'Sleep Wristband' },
          Category: 'Fitness',
          order_status: { status: 'On Hold', variant: 'warning' },
          Popularity: { value: 55, variant: 'warning' },
          price: 75.55,
        },
        {
          name: { first: 'Fitbit', last: 'Clip for Zip Wireless Activity Trackers' },
          Category: 'Fitness',
          order_status: { status: 'Canceled', variant: 'danger' },
          Popularity: { value: 75, variant: 'danger' },
          price: 105.55,
        },
      ],
      codeDataRendering,
    }
  },
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    await this.getAllAvailableLeaves()
  },
  methods: {

    async getAllAvailableLeaves() {
      const userData = getUserData()
      let response = (await leaveAPI.getLeaveBalance(userData.id))
      console.log(response)
      this.items = response.data.data
    },
  },

}
</script>
