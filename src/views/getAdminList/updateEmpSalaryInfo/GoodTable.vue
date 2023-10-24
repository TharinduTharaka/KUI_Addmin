<template>

  <b-row>
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
          :statistic="kFormatter(data.subscribersGained.analyticsData.subscribers)"
          statistic-title="Subscribers Gained"
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
          :statistic="kFormatter(data.ordersRecevied.analyticsData.orders)"
          statistic-title="Orders Received"
          :chart-data="data.ordersRecevied.series"
      />
    </b-col>
    <b-col cols="12">
      <good-table-basic/>
    </b-col>
    <b-col cols="12">
      <good-table-allowance/>
    </b-col>
    <b-col cols="12">
      <good-table-deduction/>
    </b-col>
    <b-col cols="12">
      <good-table-settings/>
    </b-col>
  </b-row>
</template>

<script>
import {BRow, BCol} from 'bootstrap-vue'
import GoodTableBasic from './GoodTableBasic.vue'
import GoodTableAllowance from './GoodTableAllowance.vue'
import GoodTableDeduction from './GoodTableDeduction.vue'
import AnalyticsCongratulation from './AnalyticsCongratulation.vue'
import GoodTableSettings from './GoodTableSettings.vue'
import {kFormatter} from "@core/utils/filter";


export default {
  methods: {kFormatter},
  components: {

    BRow,
    BCol,
    AnalyticsCongratulation,
    GoodTableBasic,
    GoodTableAllowance,
    GoodTableDeduction,
    GoodTableSettings,



  },
  data() {
    return {
      data: {},
    }
  },
  created() {
    // data
    this.$http.get('/analytics/data')
        .then(response => { this.data = response.data })
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
