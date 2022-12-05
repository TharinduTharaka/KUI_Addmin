<template>
  <div
    v-if="Object.keys(profileData).length"
    id="user-profile"
  >
    <profile-header :header-data="profileData.header" @chooseTabs="eventHandler"/>
    <!-- profile info  -->
    <section id="profile-info">
      <b-row v-if="choosedField==='feed'">
        <!-- post -->
        <b-col
          order="1"
          order-lg="2">
          <profile-post :posts="profileData.post" />
        </b-col>
        <!-- post -->

        <!-- load more  -->
        <b-col
          cols="12"
          order="4"
        >
          <profile-bottom />
        </b-col>
        <!--/ load more  -->
      </b-row>
      <b-row v-if="choosedField==='about'">
        <!-- post -->
        <b-col
            order="1"
            order-lg="2"
        >
          <profile-about :about-data="profileData.userAbout" />
        </b-col>
        <!-- post -->
      </b-row>
      <b-row v-if="choosedField==='hierarchy'">
        <b-col
            order="1"
            order-lg="2">
          <hierarchy/>
        </b-col>
      </b-row>
      <b-row v-if="choosedField==='educationalQualification'">
        <b-col
            order="1"
            order-lg="2">
          <educational-qualification/>
        </b-col>
      </b-row>
      <b-row v-if="choosedField==='pastExperiences'">
        <!-- post -->
        <b-col
            order="1"
            order-lg="2"
        >
          <past-experiences/>
        </b-col>
      </b-row>
    </section>
    <!--/ profile info  -->
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import ProfileHeader from './ProfileHeader.vue'
// import ProfileAbout from './ProfileAbout.vue'
import ProfileAbout from './subPages/About.vue'
import PastExperiences from "@/views/pages/profile/subPages/PastExperiences";
import Hierarchy from "@/views/pages/profile/subPages/Hierarchy";
import EducationalQualification from "@/views/pages/profile/subPages/EducationalQualification";
import ProfileSuggestedPages from './ProfileSuggestedPages.vue'
import ProfileTwitterFeed from './ProfileTwitterFeed.vue'
import ProfilePost from './subPages/Feed.vue'
import ProfileLatestPhotos from './ProfileLatestPhotos.vue'
import ProfileSuggestion from './ProfileSuggestion.vue'
import ProfilePolls from './ProfilePolls.vue'
import profileBottom from './profileBottom.vue'

/* eslint-disable global-require */
export default {
  components: {
    BRow,
    BCol,
    PastExperiences,
    Hierarchy,
    EducationalQualification,
    ProfileHeader,
    ProfileAbout,
    ProfileSuggestedPages,
    ProfileTwitterFeed,
    ProfilePost,
    ProfileLatestPhotos,
    ProfileSuggestion,
    ProfilePolls,
    profileBottom,
  },
  data() {
    return {
      profileData: { },
      choosedField:''
    }
  },
  created() {
    this.$http.get('/profile/data').then(res => { this.profileData = res.data })
  },
  mounted() {
    this.choosedField='feed';
  },
  methods:{
    eventHandler(event){
      this.choosedField=event;
      console.log(event)
    }
  }
}
/* eslint-disable global-require */
</script>

<style lang="scss" >
@import '@core/scss/vue/pages/page-profile.scss';
</style>
