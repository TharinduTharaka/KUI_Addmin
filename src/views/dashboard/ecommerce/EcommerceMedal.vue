<template>
  <b-card
    v-if="data"
    class="card-congratulation-medal"
  >
    <h5>Hi {{ data.name }}!</h5>
    <b-card-text class="font-small-3">
      {{items.msg}}
    </b-card-text>
    <h3 class="mb-75 mt-2 pt-50">
      <b-link>In Time - {{items.inTime}}</b-link>
    </h3>
    <b-img v-if="!items.late"
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
import {getUserData} from "@/auth/utils";
import attendanceAPI from "@/api/Attendance";


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
  data() {
    return {
      items: {
        inTime: "",
        outTime: "",
        msg: '',
        late : false
      }
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  async mounted() {
    // Set the initial number of items
    const userData = getUserData()
    this.userID = userData.id

    await this.getTodayInTime()

  },

  methods: {
    kFormatter,
    async getTodayInTime() {
      const userData = getUserData()
      let response = (await attendanceAPI.getTodayInTime(userData.id))
      console.log(response)
      this.items = response.data.data;
      this.totalRows = response.data.data.length
    }
  },
}
</script>
