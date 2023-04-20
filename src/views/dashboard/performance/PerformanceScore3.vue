<template>
  <b-card
    v-if="data"
    class="card-congratulation-medal"
  >
    <h5>Total Working Score</h5>
    <h3 class="mb-75 mt-2 pt-50">
      {{data.totalNoPayScore}}
    </h3>
    <b-img
      :src="require('@/assets/images/illustration/badge.svg')"
      class="congratulation-medal"
      alt="Medal Pic"
    />
  </b-card>
</template>

<script>
import {
  BCard, BCardText, BLink, BButton, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BImg,
    BButton,
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
  methods: {
    kFormatter,
  },
}
</script>
