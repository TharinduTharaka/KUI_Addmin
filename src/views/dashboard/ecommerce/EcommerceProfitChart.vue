<template>
  <b-card
    v-if="data"
    class="card-tiny-line-stats"
    body-class="pb-50"
  >
    <h6>Available Leaves</h6>
    <h2 class="font-weight-bolder mb-1">
      {{items.available}}
    </h2>
    <!-- chart -->
    <vue-apex-charts
      height="70"
      :options="statisticsProfit.chartOptions"
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

const $trackBgColor = '#EBEBEB'

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
      statisticsProfit: {
        chartOptions: {
          chart: {

            type: 'line',
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          grid: {
            borderColor: $trackBgColor,
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: false,
              },
            },
            padding: {
              top: -30,
              bottom: -10,
            },
          },
          stroke: {
            width: 3,
          },
          colors: [$themeColors.info],
          markers: {
            size: 2,
            colors: $themeColors.info,
            strokeColors: $themeColors.info,
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [
              {
                seriesIndex: 0,
                dataPointIndex: 5,
                fillColor: '#ffffff',
                strokeColor: $themeColors.info,
                size: 5,
              },
            ],
            shape: 'circle',
            radius: 2,
            hover: {
              size: 3,
            },
          },
          xaxis: {
            labels: {
              show: true,
              style: {
                fontSize: '0px',
              },
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
