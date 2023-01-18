import axios from '@axios'
import rosterApi from "@/api/roster";
import {getUserData} from "@/auth/utils";

export default {
  namespaced: true,
  state: {
    calendarOptions: [
      {
        color: 'danger',
        label: 'Personal',
      },
      {
        color: 'primary',
        label: 'Business',
      },
      {
        color: 'warning',
        label: 'Family',
      },
      {
        color: 'success',
        label: 'Holiday',
      },
      {
        color: 'info',
        label: 'ETC',
      },
    ],
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC'],
  },
  getters: {},
  mutations: {
    SET_SELECTED_EVENTS(state, val) {
      state.selectedCalendars = val
    },
  },
  actions: {
    fetchEvents(ctx, { calendars }) {
      const userData = getUserData()
      return new Promise((resolve, reject) => {

        rosterApi.getRoster(userData.id, calendars.join(','))
            .then( response => resolve(response.data))
            .catch(error => reject(error))
      })
    },
    addEvent(ctx, { event }) {
      const userData = getUserData()
      rosterApi.createRoster(userData.id,event)
          .then((response) => {
            console.log(response.data.code)
            if (response.data.code == 201){
              this.makeToast(response.data.msg, 'danger');
            }
            else {

              //this.$router.push(`/apps/leaves`)
            }
            // toast("Order removed successfully", "success");
            //this.$router.go(-1)
          })
          .catch(({response}) => {
            this.error = response.data.error
            console.log(this.error)
          })
    },
    updateEvent(ctx, { event }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/apps/calendar/events/${event.id}`, { event })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeEvent(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/apps/calendar/events/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
