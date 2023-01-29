<template>
  <b-card
    v-if="data"
    class="earnings-card"
  >
    <b-row>
      <b-col cols="10">
        <b-card-title class="mb-1">
          <h1>Total Penalty</h1>
        </b-card-title>

        <h2 class="mb-1">
          {{penalty}} .RS
        </h2>
<!--        <b-card-text class="text-muted font-small-2">-->
<!--          <span class="font-weight-bolder">68.2%</span><span> more earnings than last month.</span>-->
<!--        </b-card-text>-->
      </b-col>
<!--      <b-col cols="6">-->
<!--        &lt;!&ndash; chart &ndash;&gt;-->
<!--        <vue-apex-charts-->
<!--          height="120"-->
<!--          :options="earningsChart.chartOptions"-->
<!--          :series="data.series"-->
<!--        />-->
<!--      </b-col>-->
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BCardTitle, BCardText,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import {getUserData} from "@/auth/utils";
import {kFormatter} from "@core/utils/filter";
import attendanceAPI from "@/api/Attendance";

const $earningsStrokeColor2 = '#28c76f66'
const $earningsStrokeColor3 = '#28c76f33'
export default {
  components: {
    BCard,
    BRow,
    BCol,
    BCardTitle,
    BCardText,
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
      earningsChart: {
        chartOptions: {
          chart: {
            type: 'donut',
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: { show: false },
          comparedResult: [2, -3, 8],
          labels: ['App', 'Service', 'Product'],
          stroke: { width: 0 },
          colors: [$earningsStrokeColor2, $earningsStrokeColor3, $themeColors.success],
          grid: {
            padding: {
              right: -20,
              bottom: -8,
              left: -20,
            },
          },
          plotOptions: {
            pie: {
              startAngle: -10,
              donut: {
                labels: {
                  show: true,
                  name: {
                    offsetY: 15,
                  },
                  value: {
                    offsetY: -15,
                    formatter(val) {
                      // eslint-disable-next-line radix
                      return `${parseInt(val)}%`
                    },
                  },
                  total: {
                    show: true,
                    offsetY: 15,
                    label: 'App',
                    formatter() {
                      return '53%'
                    },
                  },
                },
              },
            },
          },
          responsive: [
            {
              breakpoint: 1325,
              options: {
                chart: {
                  height: 100,
                },
              },
            },
            {
              breakpoint: 1200,
              options: {
                chart: {
                  height: 120,
                },
              },
            },
            {
              breakpoint: 1045,
              options: {
                chart: {
                  height: 100,
                },
              },
            },
            {
              breakpoint: 992,
              options: {
                chart: {
                  height: 120,
                },
              },
            },
          ],
        },
      },
      penalty : 1
    }
  },
  async mounted() {
    const userData = getUserData()
    this.userID = userData.id

    await this.getTotalPenalty()

  },
  methods: {
    kFormatter,
    async getTotalPenalty() {
      const userData = getUserData()
      let response = (await attendanceAPI.getPenaltyValue(userData.id))
      console.log(response)
      this.penalty = response.data.data;
      this.totalRows = response.data.data.length
    }
  }
}
</script>
