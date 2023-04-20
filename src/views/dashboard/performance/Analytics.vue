<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col
          lg="12"
          md="12"
      >
        <analytics-congratulation :data="data.data"/>
      </b-col>
    </b-row>


    <b-row class="match-height">
      <b-col
          xl="4"
          md="6"
      >
        <performance-score1 :data="data.data" />
      </b-col>
      <b-col
          xl="4"
          md="6"
      >
        <performance-score2 :data="data.data" />
      </b-col>
      <b-col
          xl="4"
          md="6"
      >
        <performance-score3 :data="data.data" />
      </b-col>

    </b-row>

    <b-row class="match-height">
      <b-col
          lg="12"
          md="12"
      >
        <ecommerce-company-table :table-data="data.data.performanceDetailObj" />
      </b-col>

    </b-row>






    <b-row>
      <b-col cols="12">
        <invoice-list/>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {BRow, BCol} from 'bootstrap-vue'
import myTaskAPI from "@/api/my_task";

import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import {kFormatter} from '@core/utils/filter'
import InvoiceList from '@/views/apps/invoice/invoice-list/InvoiceList.vue'
import AnalyticsCongratulation from './AnalyticsCongratulation.vue'
import AnalyticsAvgSessions from './AnalyticsAvgSessions.vue'
import AnalyticsSupportTracker from './AnalyticsSupportTracker.vue'
import AnalyticsTimeline from './AnalyticsTimeline.vue'
import {getUserData} from "@/auth/utils";
import EcommerceRevenueReport from "@/views/dashboard/performance/EcommerceRevenueReport";
import EcommerceCompanyTable from "@/views/dashboard/performance/EcommerceCompanyTable";
import EcommerceMedal from "@/views/dashboard/performance/EcommerceMedal";
import EcommerceStatistics from "@/views/dashboard/performance/EcommerceStatistics";
import PerformanceScore2 from "@/views/dashboard/performance/PerformanceScore2";
import PerformanceScore1 from "@/views/dashboard/performance/PerformanceScore1";
import PerformanceScore3 from "@/views/dashboard/performance/PerformanceScore3";

export default {
  components: {
    BRow,
    BCol,
    AnalyticsCongratulation,
    EcommerceMedal,
    PerformanceScore1,
    PerformanceScore2,
    PerformanceScore3,
    AnalyticsAvgSessions,
    StatisticCardWithAreaChart,
    AnalyticsSupportTracker,
    AnalyticsTimeline,
    EcommerceRevenueReport,
    EcommerceCompanyTable

  },
  async mounted() {
    const userData = getUserData()
    myTaskAPI.getPerformanceById(userData.id)
        .then((response) => {
          console.log(response.data.data)
          this.data = response.data
        })
        .catch(({response}) => {
          this.error = response.data.error
          console.log(this.error)
        })
  },
  data() {
    return {
      countPending: 0,
      countHigh: 0,
      data: {},
    }
  },
  created() {
    // data
    const userData = getUserData()
    myTaskAPI.getPerformanceById(userData.id)
        .then((response) => {
          console.log(response.data.data)
          this.data = response.data
        })
        .catch(({response}) => {
          this.error = response.data.error
          console.log(this.error)
        })
  },
  methods: {
    kFormatter,


  },
}
</script>
