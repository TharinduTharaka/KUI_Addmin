<template>
  <div
      id="user-profile">
    <profile-header :profile-data="profileData.profileHeader" @chooseTabs="eventHandler"/>
    <!-- profile info  -->
    <section id="profile-info">
      <b-row v-if="choosedField==='feed'">
        <!-- post -->
        <b-col
            order="1"
            order-lg="2">
          <profile-post :posts="pData.post"/>
        </b-col>
        <!-- post -->

        <!-- load more  -->
        <b-col
            cols="12"
            order="4"
        >
          <profile-bottom/>
        </b-col>
        <!--/ load more  -->
      </b-row>
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
          <hierarchy :about-data="profileData.userHierarchy"/>
        </b-col>
      </b-row>
      <b-row v-if="choosedField==='educationalQualification'">
        <b-col
            order="1"
            order-lg="2">
          <educational-qualification :about-data="profileData.userEduQualification"/>
        </b-col>
      </b-row>
      <b-row v-if="choosedField==='pastExperiences'">
        <!-- post -->
        <b-col
            order="1"
            order-lg="2"
        >
          <past-experiences :about-data="profileData.userExperience"/>
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
        userPost: {},
        userAbout: {
          fullName: "",
          email: "",
          address: "",
          joinedDate: "",
          birthDay: ''

        },
        profileHeader: {
          userName: "",
          employeeStatus: "",


        },
        userEduQualification: {},
        userFeed: {},
        userHierarchy: {},
        userExperience: {}


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
    this.choosedField = 'feed';
    // this.choosedField = 'about';

    this.getAllProfileData(userData.id)
  },
  methods: {
    async getAllProfileData(id) {
      let response = (await profileAPI.getProfileData(id));
      console.log(response.data.data[0]);
      let data = response.data.data[0];


      this.profileData.userAbout.email = data.email;
      this.profileData.userAbout.address = data.perm_address;
      this.profileData.userAbout.fullName = data.name_in_full;
      this.profileData.userAbout.birthDay = data.date_of_birth;

      this.profileData.profileHeader.userName = data.given_name;
      this.profileData.profileHeader.employeeStatus = data.hr_employee_status;

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
