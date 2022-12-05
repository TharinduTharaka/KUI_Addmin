<template>
  <b-card
      :img-src="headerData.coverImg"
      alt="cover photo"
      body-class="p-0"
      class="profile-header mb-2"
      img-top>
    <!-- profile picture -->
    <div class="position-relative">
      <div class="profile-img-container d-flex align-items-center">
        <div class="profile-img">
          <b-img
              :src="headerData.avatar"
              alt="profile photo"
              fluid
              rounded
          />
        </div>
        <!-- profile title -->
        <div class="profile-title ml-3">
          <h2 class="text-white">
            {{ userName }}
          </h2>
          <p class="text-white">
            {{ "lecturer" }}
          </p>
        </div>
        <!--/ profile title -->
      </div>
    </div>
    <!--/ profile picture -->

    <!-- profile navbar -->
    <div class="profile-header-nav">
      <b-navbar
          toggleable="md"
          type="light">
        <!-- toggle button -->
        <b-navbar-toggle
            class="ml-auto"
            target="nav-text-collapse"
        >
          <feather-icon
              icon="AlignJustifyIcon"
              size="21"
          />
        </b-navbar-toggle>
        <!--/ toggle button -->

        <!-- collapse -->
        <b-collapse
            id="nav-text-collapse"
            is-nav
        >
          <b-tabs
              class="profile-tabs mt-1 mt-md-0"
              nav-class="mb-0"
              pills>
            <template #tabs-start>

<!--              <b-nav-item-->
<!--                  :active="feed"-->
<!--                  class="font-weight-bold"-->
<!--                  role="presentation"-->
<!--                  @click="chooseTabs('feed')">-->
<!--                <span class="d-none d-md-block">Feed</span>-->
<!--                <feather-icon-->
<!--                    class="d-block d-md-none"-->
<!--                    icon="RssIcon"-->
<!--                />-->
<!--              </b-nav-item>-->

              <b-nav-item
                  :active="about"
                  class="font-weight-bold"
                  role="presentation"
                  @click="chooseTabs('about')">
                <span class="d-none d-md-block">About</span>
                <feather-icon
                    class="d-block d-md-none"
                    icon="InfoIcon"
                />
              </b-nav-item>

              <b-nav-item
                  :active="hierarchy"
                  class="font-weight-bold"
                  role="presentation"
                  @click="chooseTabs('hierarchy')"
              >
                <span class="d-none d-md-block">Hierarchy</span>
                <feather-icon
                    class="d-block d-md-none"
                    icon="ImageIcon"
                />
              </b-nav-item>

              <b-nav-item
                  :active="educationalQualification"
                  class="font-weight-bold"
                  role="presentation"
                  @click="chooseTabs('educationalQualification')"
              >
                <span class="d-none d-md-block">Educational Qualification</span>
                <feather-icon
                    class="d-block d-md-none"
                    icon="UsersIcon"
                />
              </b-nav-item>

              <b-nav-item
                  :active="pastExperiences"
                  class="font-weight-bold"
                  role="presentation"
                  @click="chooseTabs('pastExperiences')"
              >
                <span class="d-none d-md-block">Past Experiences</span>
                <feather-icon
                    class="d-block d-md-none"
                    icon="UsersIcon"
                />
              </b-nav-item>

            </template>
          </b-tabs>

        </b-collapse>
        <!--/ collapse -->
      </b-navbar>
    </div>
    <!--/ profile navbar -->
  </b-card>
</template>

<script>
import {BButton, BCard, BCollapse, BImg, BNavbar, BNavbarToggle, BNavItem, BTabs,} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import feed from "@/views/pages/profile/subPages/Feed";
import {getUserData} from "@/auth/utils";

export default {
  components: {
    BCard,
    BTabs,
    BButton,
    BNavItem,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
  },
  mounted() {
    // this.feed = true
    this.about = true
    const userData = getUserData()
    console.log(userData)
    this.userName = userData.fullName
  },
  data() {
    return {
      feed: false,
      userName: '',
      about: false,
      hierarchy: false,
      educationalQualification: false,
      pastExperiences: false
    }
  },
  directives: {
    Ripple,
  },
  props: {
    headerData: {
      type: Object,
      default: () => {
      },
    },
  },

  methods: {
    chooseTabs(event) {
      this.$emit('chooseTabs',event)
      console.log(event)
      if (event === 'feed') {
        this.feed = true;
        this.about = false;
        this.hierarchy = false;
        this.educationalQualification = false;
        this.pastExperiences = false;
        // this.$emit('feed')
      } else if (event === 'about') {
        this.feed = false;
        this.about = true;
        this.hierarchy = false;
        this.educationalQualification = false;
        this.pastExperiences = false;
        // this.$emit('about')
      } else if (event === 'hierarchy') {
        this.feed = false;
        this.about = false;
        this.hierarchy = true;
        this.educationalQualification = false;
        this.pastExperiences = false;
        // this.$emit('hierarchy')
      } else if (event === 'educationalQualification') {
        this.feed = false;
        this.about = false;
        this.hierarchy = false;
        this.educationalQualification = true;
        this.pastExperiences = false;
        // this.$emit('educationalQualification')
      } else {
        this.feed = false;
        this.about = false;
        this.hierarchy = false;
        this.educationalQualification = false;
        this.pastExperiences = true;
        // this.$emit('pastExperiences')
      }
    }
  }

}
</script>
