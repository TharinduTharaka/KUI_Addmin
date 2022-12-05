<template>
  <div
      v-if="Object.keys(pData).length"
      id="user-profile"
  >
    <profile-header :header-data="pData.header" @chooseTabs="eventHandler"/>
    <!-- profile info  -->
    <section id="profile-info">
      <!--      <b-row v-if="choosedField==='feed'">-->
      <!--        &lt;!&ndash; post &ndash;&gt;-->
      <!--        <b-col-->
      <!--          order="1"-->
      <!--          order-lg="2">-->
      <!--          <profile-post :posts="profileData.post" />-->
      <!--        </b-col>-->
      <!--        &lt;!&ndash; post &ndash;&gt;-->

      <!--        &lt;!&ndash; load more  &ndash;&gt;-->
      <!--        <b-col-->
      <!--          cols="12"-->
      <!--          order="4"-->
      <!--        >-->
      <!--          <profile-bottom />-->
      <!--        </b-col>-->
      <!--        &lt;!&ndash;/ load more  &ndash;&gt;-->
      <!--      </b-row>-->
      <b-row v-if="choosedField==='about'">
        <!-- post -->
        <b-col
            order="1"
            order-lg="2"
        >
          <profile-about :about-data="profileData.userAbout"/>
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
import {BCol, BRow} from 'bootstrap-vue'

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
import {getUserData} from "@/auth/utils";
import profileAPI from '@/api/profile'
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
      profileData: {
        userAbout: {
          fullName: "",
          email: "",
          address: "",
          joinedDate: "",
          birthDay: ''

        }
      },
      pData: {},
      choosedField: ''
    }
  },
  created() {
    this.$http.get('/profile/data').then(res => {
      this.pData = res.data
      console.log(this.pData)
    })
  },
  mounted() {
    const userData = getUserData()
    console.log(userData)
    // this.choosedField='feed';
    this.choosedField = 'about';
    this.getAllProfileData(userData.id)
  },
  methods: {
    async getAllProfileData(id) {
      let response = (await profileAPI.getProfileData(id));
      console.log(response.data.data);
      let data = response.data.data;
      this.profileData.userAbout.email = data.email;
      this.profileData.userAbout.address = data.perm_address;
      this.profileData.userAbout.fullName = data.name_in_full;
      this.profileData.userAbout.birthDay = data.date_of_birth;

    },
    eventHandler(event) {
      this.choosedField = event;
      console.log(event)
    }
  }
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-profile.scss';
</style>
