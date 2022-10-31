<template>
  <div v-if="Object.keys(profileData).length"
       id="user-profile">

    <!-- profile info  -->
    <section id="profile-info">
      <b-row v-if="page==='feed'">
        <!-- about -->
        <b-col
            cols="12"
            lg="3"
            order="2"
            order-lg="1">
          <profile-about :about-data="profileData.userAbout"/>
        </b-col>
        <!--/ about -->

        <!-- post -->
        <b-col
            cols="12"
            lg="9"
            order="1"
            order-lg="2"
        >
          <profile-post :posts="profileData.post"/>
        </b-col>
        <!-- post -->

        <!-- load more  -->
        <!--      <b-col-->
        <!--          cols="12"-->
        <!--          order="4"-->
        <!--      >-->
        <!--        <profile-bottom />-->
        <!--      </b-col>-->
        <!--/ load more  -->
      </b-row>
      <b-row v-else-if="page==='about'">
        <!-- about -->
        <b-col
            cols="12"
            lg="3"
            order="2"
            order-lg="1">
          <profile-about :about-data="profileData.userAbout"/>
        </b-col>
        <!--/ about -->

        <!-- post -->
        <b-col
            cols="12"
            lg="9"
            order="1"
            order-lg="2"
        >
          <profile-post :posts="profileData.post"/>
        </b-col>
        <!-- post -->

        <!-- load more  -->
        <!--      <b-col-->
        <!--          cols="12"-->
        <!--          order="4"-->
        <!--      >-->
        <!--        <profile-bottom />-->
        <!--      </b-col>-->
        <!--/ load more  -->
      </b-row>
      <b-row v-else-if="page==='hierarchy'">
        <!-- about -->
        <b-col
            cols="12"
            lg="3"
            order="2"
            order-lg="1">
          <profile-about :about-data="profileData.userAbout"/>
        </b-col>
        <!--/ about -->

        <!-- post -->
        <b-col
            cols="12"
            lg="9"
            order="1"
            order-lg="2"
        >
          <profile-post :posts="profileData.post"/>
        </b-col>
        <!-- post -->

        <!-- load more  -->
        <!--      <b-col-->
        <!--          cols="12"-->
        <!--          order="4"-->
        <!--      >-->
        <!--        <profile-bottom />-->
        <!--      </b-col>-->
        <!--/ load more  -->
      </b-row>
      <b-row v-else-if="page==='educationalQualification'">
        <!-- about -->
        <b-col
            cols="12"
            lg="3"
            order="2"
            order-lg="1">
          <profile-about :about-data="profileData.userAbout"/>
        </b-col>
        <!--/ about -->

        <!-- post -->
        <b-col
            cols="12"
            lg="9"
            order="1"
            order-lg="2"
        >
          <profile-post :posts="profileData.post"/>
        </b-col>
        <!-- post -->

        <!-- load more  -->
        <!--      <b-col-->
        <!--          cols="12"-->
        <!--          order="4"-->
        <!--      >-->
        <!--        <profile-bottom />-->
        <!--      </b-col>-->
        <!--/ load more  -->
      </b-row>
      <b-row v-else-if="page==='pastExperiences'">
        <!-- about -->
        <b-col
            cols="12"
            lg="3"
            order="2"
            order-lg="1">
          <profile-about :about-data="profileData.userAbout"/>
        </b-col>
        <!--/ about -->

        <!-- post -->
        <b-col
            cols="12"
            lg="9"
            order="1"
            order-lg="2"
        >
          <profile-post :posts="profileData.post"/>
        </b-col>
        <!-- post -->

        <!-- load more  -->
        <!--      <b-col-->
        <!--          cols="12"-->
        <!--          order="4"-->
        <!--      >-->
        <!--        <profile-bottom />-->
        <!--      </b-col>-->
        <!--/ load more  -->
      </b-row>
    </section>
    <!--/ profile info  -->

  </div>
</template>

<script>
import {BCol, BRow} from 'bootstrap-vue'

import ProfileHeader from './ProfileHeader.vue'
import ProfileAbout from './ProfileAbout.vue'

// import ProfileSuggestedPages from './ProfileSuggestedPages.vue'
// import ProfileTwitterFeed from './ProfileTwitterFeed.vue'
import ProfilePost from './subPages/ProfilePost.vue'

// import ProfileLatestPhotos from './ProfileLatestPhotos.vue'
// import ProfileSuggestion from './ProfileSuggestion.vue'
// import ProfilePolls from './ProfilePolls.vue'
import profileBottom from './profileBottom.vue'

export default {
  name: "ProfileBody",
  components: {
    BRow,
    BCol,

    ProfileHeader,
    ProfileAbout,
    ProfilePost,
    profileBottom,
  },

  data() {
    return {
      page: '',
      profileData: {},
    }
  },
  created() {
    this.$http.get('/profile/data').then(res => {
      this.profileData = res.data
    })
  },
}
</script>

<style scoped>

</style>
