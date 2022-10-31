<template>
  <b-card>
    <b-card-header>
      <h3> Educational </h3>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col lg="1">
          <b-avatar
              size="42"
              src="@/assets/images/portrait/small/avatar-s-9.jpg"
              variant="transparent"
          />
        </b-col>
        <b-col>
          <div class="chat-info flex-grow-1">
            <h3 class="mb-0">
              {{ "University of Sri Jayewardenepura" }}
            </h3>
            <h6 class="mb-0">
              {{ "Bachelor of Science (B.Sc) in information technology" }}
            </h6>
            <p class="card-text text-truncate">
              {{ "Jan 2013 - Oct 2015 " }}
            </p>
          </div>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>


</template>

<script>
import {BAvatar, BBadge, BCard, BCardBody, BCardHeader, BCol, BRow,} from 'bootstrap-vue'

export default {
  name: "EducationalQualification",
  components: {
    BCard, BAvatar, BBadge, BRow, BCol, BCardBody,
    BCardHeader,
  },
  data() {
    return {
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

<style scoped>

</style>
