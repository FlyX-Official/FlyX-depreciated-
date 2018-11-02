<template>
  <div class="nav-wrap">
    <form @submit.prevent="send()">
      <input type="text" v-model="searchData.from" name="from" placeholder="From">
      <input type="text" v-model="searchData.to" name="to" placeholder="To">
      <input type="number" v-model="searchData.radius" name="radius" placeholder="Radius">
      <input type="date" v-model="searchData.date" name="date" id="">
      <input type="submit" value="Go!">
    </form>
  <span>{{ searchData }}</span>
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
          date: ''
        }
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
