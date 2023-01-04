<template>
  <b-code title="Basic Table">
    <!-- search input -->
    <div class="custom-search d-flex justify-content-end">

    </div>

    <!-- table -->
    <vue-good-table
        :columns="columns"
        :rows="rows"
        :select-options="{
        enabled: false,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'rows selected',
        clearSelectionText: 'clear',
        disableSelectInfo: true, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
        :pagination-options="{
        enabled: true,
        perPage:pageLength
      }"
    >
      <template
          slot="table-row"
          slot-scope="props">

        <!-- Column: Status -->
        <span v-if="props.column.field === 'status'">
          <b-badge :variant="statusVariant(props.row.status)">
            {{ props.row.status }}
          </b-badge>
        </span>
      </template>

      <!-- pagination -->
      <template
          slot="pagination-bottom"
          slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap ">
              Showing 1 to
            </span>
            <b-form-select
                v-model="pageLength"
                :options="['3','5','10']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap"> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
            >
              <template #prev-text>
                <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>

<!--    <template #code>-->
<!--      {{ codeBasic }}-->
<!--    </template>-->
  </b-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import { codeBasic } from './code'
import myTaskAPI from "@/api/my_task";

export default {
  components: {
    BCardCode,
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
  },
  data() {
    return {
      pageLength: 3,
      dir: false,
      codeBasic,
      columns: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Task Id',
          field: 'taskId',
        },
        {
          label: 'Estimate',
          field: 'estimate',
        },
        {
          label: 'Updated Date',
          field: 'date',
        }
      ],
      rows: [],
      searchTerm: '',
      status: [{
        1: 'Pending',
        2: 'Delete',
        3: 'Completed',
      },
        {
          1: 'light-primary',
          2: 'light-danger',
          3: 'light-success',
        }],
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    // direction() {
    //   if (store.state.appConfig.isRTL) {
    //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //     this.dir = true
    //     return this.dir
    //   }
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   this.dir = false
    //   return this.dir
    // },
  },
  created() {
    // this.$http.get('/good-table/basic')
    //     .then(res => {
    //       this.rows = res.data
    //       console.log(this.rows)
    //     })
    this.getAllTask()
  },

  methods:{
    async getAllTask() {
      let response = (await myTaskAPI.getEstimateBreakDown(this.$route.params.task_id))
      console.log(response)
      this.rows = response.data.data.taskBreakdownEntities;
      this.totalRows = response.data.data.length
    },
  }
}
</script>
