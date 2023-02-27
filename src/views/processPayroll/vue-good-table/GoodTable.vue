<template>
  <b-row>
    <b-col cols="12">
<!--      <good-table-basic />-->
<!--      <good-table-row-group />-->
<!--      <good-table-column-search />-->
      <good-table-advance-search />
<!--      <good-table-i18n />-->
<!--      <good-table-ssr />-->
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import GoodTableAdvanceSearch from './GoodTableAdvanceSearch.vue'

export default {
  components: {
    BRow,
    BCol,
    GoodTableAdvanceSearch,

  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
