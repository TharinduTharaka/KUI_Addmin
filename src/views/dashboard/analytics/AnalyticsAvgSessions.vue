<template>
  <b-card v-if="data">
    <b-row class="pb-50">

      <!-- text and button -->
      <b-col
        sm="6"
        order-sm="1"
        order="2"
        class="d-flex justify-content-between flex-column mt-1 mt-sm-0"
      >
        <div>
          <h2 class="font-weight-bolder mb-25">
            {{ kFormatter(totalCount) }}
          </h2>
          <b-card-text class="font-weight-bold mb-2">
            Task Added Rate
          </b-card-text>

          <h5 class="font-medium-2">
            <span class="text-success mr-50">100%</span>
            <span>vs Week</span>
          </h5>
        </div>

      </b-col>

      <!-- dropdown and chart -->
      <b-col
        sm="6"
        cols="12"
        order-sm="2"
        order="1"
        class="d-flex justify-content-between flex-column text-right"
      >
        <div>
          <b-dropdown
            text="This Week"
            variant="transparent"
            class="chart-dropdown"
            left
            no-caret
            size="sm"
          >
            <b-dropdown-item
              v-for="day in data.lastDays"
              :key="day"
            >
              {{ day }}
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <!-- apex chart -->
        <vue-apex-charts
          type="bar"
          height="200"
          :options="salesBar.chartOptions"
          :series="dataSeries"
        />
      </b-col>
    </b-row>
    <hr>

    <!-- progress bar -->
    <b-row class="avg-sessions pt-50">
      <b-col
        cols="6"
        class="mb-2"
      >
        <b-card-text class="mb-50">
          Total: {{ totalCount }}
        </b-card-text>
        <b-progress
          value="100"
          max="100"
          height="6px"
        />
      </b-col>
      <b-col
        cols="6"
        class="mb-2"
      >
        <b-card-text class="mb-50">
          High: {{ kFormatter(high) }}
        </b-card-text>
        <b-progress
          value="100"
          max="100"
          height="6px"
          variant="warning"
        />
      </b-col>
      <b-col cols="6">
        <b-card-text class="mb-50">
          Medium: {{ medium }}
        </b-card-text>
        <b-progress
          value = "100"
          max="100"
          height="6px"
          variant="danger"
          class="mt-25"
        />
      </b-col>
      <b-col cols="6">
        <b-card-text class="mb-50">
          Low: {{ low }}
        </b-card-text>
        <b-progress
          value="100"
          max="100"
          variant="success"
          height="6px"
          class="mt-25"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BButton, BDropdown, BDropdownItem, BProgress, BCardText,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Ripple from 'vue-ripple-directive'
import { $themeColors } from '@themeConfig'
import { kFormatter } from '@core/utils/filter'
import {getUserData} from "@/auth/utils";
import myTaskAPI from "@/api/my_task";

export default {
  components: {
    VueApexCharts,
    BCard,
    BRow,
    BCol,
    BButton,
    BCardText,
    BDropdown,
    BDropdownItem,
    BProgress,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  async mounted() {
    await this.getAllTask()
    await this.getLastSevenDays()
  },
  data() {
    return {
      totalCount: '',
      high: '',
      medium: '',
      low: '',
      dataSeries: [
        {
          name : 'Sessions',
          data : [0,0,1,0,0,0,0]
        }
      ],
      salesBar: {
        chartOptions: {
          chart: {
            sparkline: { enabled: true },
            toolbar: { show: false },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
            },
          },
          states: {
            hover: {
              filter: 'none',
            },
          },
          colors: [
            '#ebf0f7',
            '#ebf0f7',
            $themeColors.primary,
            '#ebf0f7',
            '#ebf0f7',
            '#ebf0f7',
          ],
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
              endingShape: 'rounded',
            },
          },
          tooltip: {
            x: { show: false },
          },
          xaxis: {
            type: 'numeric',
          },
        },
      },
    }
  },
  methods: {
    kFormatter,
    async getAllTask() {
      const userData = getUserData()
      let response = (await myTaskAPI.getCompletedTaskByDay(userData.id))
      this.nameNew = userData.fullName
      this.countPending = response.data.data.pendingTask;
      this.countHigh = response.data.data.highPriorityTask;
      this.totalCount = response.data.data.allTask
      this.high = response.data.data.highPriorityTask
      this.medium = response.data.data.mediumPriorityTask
      this.low = response.data.data.lowPriorityTask

    },
    async getLastSevenDays() {
      const userData = getUserData()
      let response2 = (await myTaskAPI.getLastSevenDay(userData.id))
      // this.dataSeries = response2.data.data.series
      // console.log(response2.data.data.series)
    }

  },
}
</script>
