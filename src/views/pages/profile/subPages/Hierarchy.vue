<template>
  <b-card>
    <b-card-header>
      <div class="d-flex align-items-center">

        <b-card-title class="ml-25">
          KIU
        </b-card-title>
      </div>

    </b-card-header>

    <!-- timeline -->
    <b-card-body>
      <app-timeline>
        <app-timeline-item variant="primary">
          <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
            <h6>Senior Lecturer</h6>
            <small class="timeline-item-time text-nowrap text-muted ml-1">1yr 3 mos</small>
          </div>
          <p>Aug 2021 - Present</p>
        </app-timeline-item>

        <app-timeline-item variant="warning">
          <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
            <h6>Lecturer</h6>
            <small class="timeline-item-time text-nowrap text-muted ml-1">3yr 11 mos</small>
          </div>
          <p>Sep 2017 - Jul 2021</p>
        </app-timeline-item>

        <app-timeline-item variant="info">
          <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
            <h6>Assistant lecturer</h6>
            <small class="timeline-item-time text-nowrap text-muted ml-1">1 yr</small>
          </div>
          <p>Sep 2016 - Sep 2017</p>
        </app-timeline-item>
      </app-timeline>
      <!--/ timeline -->
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BAvatar,
  BAvatarGroup,
  BCard,
  BCardBody,
  BCardHeader,
  BCardTitle,
  BImg,
  BMedia,
  BMediaAside,
  BMediaBody,
  VBTooltip,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
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
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {

      jobRole: '',
      startDate: '',
      endDate: '',
      jobPeriod: '',

      avatars: [
        {userImg: require('@/assets/images/portrait/small/avatar-s-9.jpg'), name: 'Billy Hopkins'},
        {userImg: require('@/assets/images/portrait/small/avatar-s-6.jpg'), name: 'Amy Carson'},
        {userImg: require('@/assets/images/portrait/small/avatar-s-8.jpg'), name: 'Brandon Miles'},
        {userImg: require('@/assets/images/portrait/small/avatar-s-7.jpg'), name: 'Daisy Weber'},
        {userImg: require('@/assets/images/portrait/small/avatar-s-20.jpg'), name: 'Jenny Looper'},
      ],
    }
  },
}
</script>
