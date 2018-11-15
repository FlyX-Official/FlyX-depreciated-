<template>
  <div class="nav-wrap">
    <form @submit.prevent="send()">
      <input type="text" v-model="searchData.from" name="from" placeholder="From">
      <input type="text" v-model="searchData.to" name="to" placeholder="To">
      <input type="range" name="radius" v-model="searchData.radius" id="radiusID" value="24" min="1" max="100" oninput="radiusValueID.value = radiusID.value" class="slider">
      <output name="radiusValue" id="radiusValueID">24</output>
       <!-- the vCalendar, see documentation https://docs.vcalendar.io/#welcome-to-v-calendar -->
      <!-- available dates adds contraint to calendar -->
      <v-date-picker
        class="datepicker"
        is-double-paned
        :pane-width="180"
        name="date"
        mode='range'
        :available-dates='{ start: new Date(), end: new Date(), span: 90 }'
        :disabledAttribute='disabledAttribute'
        v-model='searchData.date'
        show-caps>
      </v-date-picker>
      <!-- <input type="date" v-model="searchData.date" name="date" id=""> -->
      <input type="submit" value="Go!" class="submitbutton">
    </form>
  <!--<span>{{ searchData }}</span>-->
  </div>
</template>

<script>
/* eslint-disable */

  // We have to import our base URL connection to the server first.
  // (This is done using Axios...view the Api.js file to see this)
  import Api from '@/services/Api'

  export default {
    data() {
      return {
        // searchData is the object that exists in our nav component 
        // to temporarily store the input form data
        searchData: {
          from: '',
          to: '',
          radius: '',
          date: {
            start: new Date(),
            end: new Date(),
          }
        },
         //works like css, for what is disabled we can choose the style to give the content
        disabledAttribute: {
            contentStyle: {
            opacity: 0.3,
          }
        },
      }
    },
    methods: {
      // This is the function that sends a post request containing 'searchData' to the server
      send: function () {
        Api().post('/search', this.searchData)
          .then(response => {
            // This logs the servers response to the post request
            console.log('Response Recieved');
            
            // This line sends(emits) the ticket data as an event. Other components
            // can listen for this event to have access to the data that is sent.
            this.$root.$emit('ticketComm', response.data);
          })
          .catch(error => {
            // This catches any error the server would send back
            console.log(error);
          });
      } 
    }
  }

</script>
