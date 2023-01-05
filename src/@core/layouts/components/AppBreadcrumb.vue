<template>
  <b-row
      v-if="$route.meta.pageTitle"
      class="content-header">

    <!-- Content Left -->
    <b-col
        class="content-header-left mb-2"
        cols="12"
    >
      <b-row class="breadcrumbs-top">
        <b-col cols="12" v-if="$route.params.status">
          <h2 class="content-header-title  pr-1 mb-0" v-if="$route.params.status === '1'">
            {{"Pending Task Filter Table"}}
          </h2>
          <h2 class="content-header-title  pr-1 mb-0" v-if="$route.params.status === '2'">
            {{"Deleted Task Filter Table"}}
          </h2>
          <h2 class="content-header-title  pr-1 mb-0" v-if="$route.params.status === '3'">
            {{"Completed Task Filter Table"}}
          </h2>
          <h2 class="content-header-title  pr-1 mb-0" v-if="$route.params.status === '4'">
            {{"Supervisor Completed Task Filter Table"}}
          </h2>
        </b-col>
        <b-col cols="12" v-else>
          <h2 class="content-header-title  pr-1 mb-0">
            {{ $route.meta.pageTitle }}
          </h2>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import {
  BBreadcrumb, BBreadcrumbItem, BRow, BCol, BDropdown, BDropdownItem, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
  // computed:{
  //   console.log(this.$route.params)
  // },
  async mounted(){
    // $route.params.status
    console.log(this.$route.params)
  }
}
</script>
