<template>
  <b-card
    v-if="data"
    body-class="pb-50"
  >
    <h6>Taken Leaves</h6>
    <h2 class="font-weight-bolder mb-1">
      {{items.taken}}
    </h2>
    <!-- chart -->
    <vue-apex-charts
      height="70"
      :options="statisticsOrder.chartOptions"
      :series="data.series"
    />
  </b-card>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import {getUserData} from "@/auth/utils";
import {kFormatter} from "@core/utils/filter";
import attendanceAPI from "@/api/Attendance";

const $barColor = '#f3f3f3'

export default {
  components: {
    BCard,
    VueApexCharts,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      statisticsOrder: {
        chartOptions: {
          chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              top: -15,
              bottom: -15,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '20%',
              startingShape: 'rounded',
              colors: {
                backgroundBarColors: [$barColor, $barColor, $barColor, $barColor, $barColor],
                backgroundBarRadius: 5,
              },
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: [$themeColors.warning],

          xaxis: {
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: false,
            },
          },
        },
      },
      items : {
        available : "",
        taken : ""
      }
    }
  },
  async mounted() {
    const userData = getUserData()
    this.userID = userData.id

    await this.getTotalTakenLeaves()

  },
  methods: {
    kFormatter,
    async getTotalTakenLeaves() {
      const userData = getUserData()
      let response = (await attendanceAPI.getTotalTakenLeaves(userData.id))
      console.log(response)
      this.items = response.data.data;
    }
  }
}
</script>
