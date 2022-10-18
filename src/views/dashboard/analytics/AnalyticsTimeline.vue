<template>
  <b-card
    v-if="data"
    no-body
  >
    <b-card-header>
      <b-card-title class="ml-25">
        Due Date Timeline
      </b-card-title>
    </b-card-header>

    <!-- timeline -->
    <b-card-body>
      <app-timeline>

        <div v-if="priority1 == 'Low'">
          <app-timeline-item variant="primary">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day1 }}</h6>
            </div>
            <p>{{ task1 }}</p>
          </app-timeline-item>
        </div>
        <div v-if="priority1 == 'Medium'">
          <app-timeline-item variant="info">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day1 }}</h6>
            </div>
            <p>{{ task1 }}</p>
          </app-timeline-item>
        </div>
        <div v-if="priority1 == 'High'">
          <app-timeline-item variant="warning">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day1 }}</h6>
            </div>
            <p>{{ task1 }}</p>
          </app-timeline-item>
        </div>

        <div v-if="priority2 == 'Low'">
          <app-timeline-item variant="primary">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day2 }}</h6>
            </div>
            <p>{{ task2 }}</p>
          </app-timeline-item>
        </div>
        <div v-if="priority2 == 'Medium'">
          <app-timeline-item variant="info">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day2 }}</h6>
            </div>
            <p>{{ task2 }}</p>
          </app-timeline-item>
        </div>
        <div v-if="priority2 == 'High'">
          <app-timeline-item variant="warning">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day2 }}</h6>
            </div>
            <p>{{ task2 }}</p>
          </app-timeline-item>
        </div>


        <div v-if="priority3 == 'Low'">
          <app-timeline-item variant="primary">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day3 }}</h6>
            </div>
            <p>{{ task3 }}</p>
          </app-timeline-item>
        </div>
        <div v-if="priority3 == 'Medium'">
          <app-timeline-item variant="info">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day3 }}</h6>
            </div>
            <p>{{ task3 }}</p>
          </app-timeline-item>
        </div>
        <div v-if="priority3 == 'High'">
          <app-timeline-item variant="warning">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day3 }}</h6>
            </div>
            <p>{{ task3 }}</p>
          </app-timeline-item>
        </div>


        <div v-if="priority4 == 'Low'">
          <app-timeline-item variant="primary">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day4 }}</h6>
            </div>
            <p>{{ task4 }}</p>
          </app-timeline-item>
        </div>
        <div v-if="priority4 == 'Medium'">
          <app-timeline-item variant="info">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day4 }}</h6>
            </div>
            <p>{{ task4 }}</p>
          </app-timeline-item>
        </div>
        <div v-if="priority4 == 'High'">
          <app-timeline-item variant="warning">
            <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
              <h6>{{ day4 }}</h6>
            </div>
            <p>{{ task4 }}</p>
          </app-timeline-item>
        </div>


      </app-timeline>
      <!--/ timeline -->
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardHeader, BCardTitle, BImg, BMedia, BMediaBody, BMediaAside, BAvatar, BAvatarGroup, VBTooltip,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import {getUserData} from "@/auth/utils";
import myTaskAPI from "@/api/my_task";
/* eslint-disable global-require */
export default {
  components: {
    BCard,
    BImg,
    BCardBody,
    BCardHeader,
    BCardTitle,
    AppTimeline,
    AppTimelineItem,
    BMedia,
    BAvatar,
    BMediaBody,
    BMediaAside,
    BAvatarGroup,
  },
  data() {
    return {
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      priority1: '',
      priority2: '',
      priority3: '',
      priority4: '',
      task1: '',
      task2: '',
      task3: '',
      task4: '',
      data: {},
    }
  },
  async mounted() {
    await this.getAllTask()
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
  methods : {
    async getAllTask() {
      const userData = getUserData()
      let response = (await myTaskAPI.getLastFourDue(userData.id))

      this.day1 = response.data.data.due1
      this.day2 = response.data.data.due2
      this.day3 = response.data.data.due3
      this.day4 = response.data.data.due4
      this.priority1 = response.data.data.priority1
      this.priority2 = response.data.data.priority2
      this.priority3 = response.data.data.priority3
      this.priority4 = response.data.data.priority4
      this.task1 = response.data.data.task1
      this.task2 = response.data.data.task2
      this.task3 = response.data.data.task3
      this.task4 = response.data.data.task4
      this.nameNew = userData.fullName
    }
  }
}
</script>
