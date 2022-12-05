<template>
  <b-card>
    <!-- about -->
    <div>
      <h5 class="text-capitalize mb-75">
        Name
      </h5>
      <b-card-text>
        {{ aboutData.fullName}}
      </b-card-text>
      <h5 class="text-capitalize mb-75">
        Address
      </h5>
      <b-card-text>
        {{ aboutData.address }}
      </b-card-text>
      <h5 class="text-capitalize mb-75">
        Email
      </h5>
      <b-card-text>
        {{ aboutData.email }}
      </b-card-text>
      <h5 class="text-capitalize mb-75">
        Date of Birth
      </h5>
      <b-card-text>
        {{ aboutData.birthDay }}
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
import {BCard, BCardText} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
  },
  props: {
    aboutData: {},
  },

  mounted() {
    console.log(this.aboutData)
  },
}
</script>
