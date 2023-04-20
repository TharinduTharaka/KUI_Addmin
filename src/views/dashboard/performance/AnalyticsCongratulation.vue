<template>
  <b-card
    text-variant="center"
    class="card card-congratulations"
  >
    <!-- images -->
    <b-img
      :src="require('@/assets/images/elements/decore-left.png')"
      class="congratulations-img-left"
    />
    <b-img
      :src="require('@/assets/images/elements/decore-right.png')"
      class="congratulations-img-right"
    />
    <!--/ images -->

    <b-avatar
      variant="primary"
      size="70"
      class="shadow mb-2"
    >
      <feather-icon
        size="28"
        icon="AwardIcon"
      />
    </b-avatar>
    <h1 class="mb-1 mt-50 text-white">

      {{ this.newData.totalScore }}
    </h1>
    <b-card-text class="m-auto w-75">
      YOUR TOTAL SCORE PERCENTAGE OUT OF 100%.
    </b-card-text>
  </b-card>
</template>

<script>
import {
  BCard, BImg, BAvatar, BCardText,
} from 'bootstrap-vue'
import {getUserData} from "@/auth/utils";
import myTaskAPI from "@/api/my_task";

export default {
  components: {
    BCard,
    BAvatar,
    BImg,
    BCardText,
  },
  async mounted() {
    await this.getAllTask()
    const userData = getUserData()
    this.userID = userData.id
  },
  data() {
    return {
      count: 0,
      total: '',
      nameNew: '',
      newData: {},
    }
  },
  props: {

    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async getAllTask() {
      const userData = getUserData()
      let response = (await myTaskAPI.getPerformanceById(userData.id))
      this.newData = response.data.data
      this.total = userData.total
    }
  }
}
</script>
