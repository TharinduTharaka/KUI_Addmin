<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col
          lg="6"
          md="12"
      >
        <analytics-congratulation :data="data.congratulations"/>
      </b-col>
      <b-col
          lg="3"
          sm="6"
      >
        <statistic-card-with-area-chart
            v-if="data.subscribersGained"
            icon="UsersIcon"
            :statistic="kFormatter(countPending)"
            statistic-title="Pending Tasks"
            :chart-data="data.subscribersGained.series"
        />
      </b-col>
      <b-col
          lg="3"
          sm="6"
      >
        <statistic-card-with-area-chart
            v-if="data.ordersRecevied"
            icon="PackageIcon"
            color="warning"
            :statistic="kFormatter(countHigh)"
            statistic-title="High Priority Task"
            :chart-data="data.ordersRecevied.series"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="6">
        <analytics-avg-sessions :data="data.avgSessions"/>
      </b-col>
      <b-col lg="6">
        <analytics-support-tracker :data="data.supportTracker"/>
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="4">
        <analytics-timeline :data="data.timeline"/>
      </b-col>
      <b-col lg="4">
        <analytics-sales-radar-chart :data="data.salesChart"/>
      </b-col>
      <b-col lg="4">
        <analytics-app-design :data="data.appDesign"/>
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

export default {
  components: {
    BRow,
    BCol,
    AnalyticsCongratulation,
    AnalyticsAvgSessions,
    StatisticCardWithAreaChart,
    AnalyticsSupportTracker,
    AnalyticsTimeline,

  },
  async mounted() {
    await this.getAllTask()
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
    this.$http.get('/analytics/data')
        .then(response => {
          this.data = response.data
        })
  },
  methods: {
    kFormatter,
    async getAllTask() {
      const userData = getUserData()
      let response = (await myTaskAPI.getCompletedTaskByDay(userData.id))

      this.nameNew = userData.fullName
      this.countPending = response.data.data.pendingTask;
      this.countHigh = response.data.data.highPriorityTask;
    }

  },
}
</script>
