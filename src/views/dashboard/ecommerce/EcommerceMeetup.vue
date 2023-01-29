<template>
  <b-card
    v-if="data"
    no-body
    class="card-developer-meetup"
  >
    <div class="bg-light-primary rounded-top text-center">
      <b-img
        :src="require('@/assets/images/illustration/email.svg')"
        alt="Meeting Pic"
        height="170"
      />
    </div>
    <b-card-body>
      <!-- metting header -->
      <div class="meetup-header d-flex align-items-center">
        <div class="meetup-day">
<!--          <h6 class="mb-0">-->
<!--            THU-->
<!--          </h6>-->
<!--          <h3 class="mb-0">-->
<!--            24-->
<!--          </h3>-->
        </div>
        <div class="my-auto">
          <b-card-title class="mb-25">
            {{items.title}}
          </b-card-title>
          <b-card-text class="mb-0">
            {{items.description}}
          </b-card-text>
        </div>
      </div>
      <!--/ metting header -->

      <b-media-aside class="mr-1">
        <b-avatar
            rounded
            variant="light-primary"
            size="34"
        >
<!--          <feather-icon-->
<!--              :icon="media.avatar"-->
<!--              size="18"-->
<!--          />-->
        </b-avatar>
      </b-media-aside>
      <b-media-body>
        <h6 class="mb-0">
          Start Date
        </h6>
        <small>{{items.startDate}}</small>
      </b-media-body>


      <b-media-aside class="mr-1">
        <b-avatar
            rounded
            variant="light-primary"
            size="34"
        >
          <!--          <feather-icon-->
          <!--              :icon="media.avatar"-->
          <!--              size="18"-->
          <!--          />-->
        </b-avatar>
      </b-media-aside>
      <b-media-body>
        <h6 class="mb-0">
          End Date
        </h6>
        <small>{{items.endDate}}</small>
      </b-media-body>



    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BImg, BCardBody, BCardText, BCardTitle, BMedia, BMediaAside, BAvatar, BAvatarGroup, VBTooltip, BMediaBody,
} from 'bootstrap-vue'
import {getUserData} from "@/auth/utils";
import {kFormatter} from "@core/utils/filter";
import rosterAPI from "@/api/roster";

export default {
  components: {
    BCard,
    BImg,
    BCardBody,
    BCardText,
    BCardTitle,
    BMedia,
    BMediaAside,
    BAvatar,
    BAvatarGroup,
    BMediaBody,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data(){
    return {
      items :{

      }
    }
  },
  async mounted() {
    const userData = getUserData()
    this.userID = userData.id

    await this.getMyLatestRoster()

  },
  methods: {
    kFormatter,
    async getMyLatestRoster() {
      const userData = getUserData()
      let response = (await rosterAPI.getLatestRoster(userData.id))
      console.log(response)
      this.items = response.data.data;
      this.totalRows = response.data.data.length
    }
  }
}
</script>
