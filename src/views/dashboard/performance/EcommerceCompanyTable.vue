<template>
  <b-card
    v-if="tableData"
    no-body
    class="card-company-table"
  >
    <b-table
      :items="tableData"
      responsive
      :fields="fields"
      class="mb-0"
    >
      <!-- company -->

    </b-table>
  </b-card>
</template>

<script>
import {
  BCard, BTable, BAvatar, BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BTable,
    BAvatar,
    BImg,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [
        { key: 'id', label: 'id' },
        { key: 'category', label: 'category' },
        { key: 'score', label: 'score' },
        { key: 'idealRating', label: 'idealRating' },
        { key: 'rank', label: 'rank' },
        { key: 'comment', label: 'comment' }
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}
</style>
