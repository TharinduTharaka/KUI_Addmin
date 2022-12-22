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
      <h5 class="text-capitalize mb-75">
        Person Type
      </h5>
      <b-card-text>
        {{ aboutData.personType }}
      </b-card-text>
      <h5 class="text-capitalize mb-75">
        NIC No
      </h5>
      <b-card-text>
        {{ aboutData.nicNo }}
      </b-card-text>
      <h5 class="text-capitalize mb-75">
        Passport No
      </h5>
      <b-card-text>
        {{ aboutData.passportNo }}
      </b-card-text>
      <h5 class="text-capitalize mb-75">
        Contact No
      </h5>
      <b-card-text>
        {{ aboutData.contactNo }}
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
