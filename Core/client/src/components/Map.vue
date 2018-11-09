<template>
  <div class="map-wrap">
    <!--<iframe src="https://search-wefly-ndmsaxpla3qpn2wtwbevnaig24.us-west-1.es.amazonaws.com/_plugin/kibana/app/kibana#/visualize/edit/051f9230-cd6b-11e8-99ce-bd7196a584c5?embed=true&_g=()"></iframe>-->
    <div id="map"></div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'tickets',
    data() {
      return {
        // Instance(component) bound ticket array
        tickets: []
        // mapName: 'map'
      }
    },
    mounted() {
      // This block listens for a 'ticketComm' event and then stores the data
      // that was emitted into our local 'tickets' array.
      this.$root.$on('ticketComm', data => {
        this.tickets = data.tickets;
      });

      var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 3
        });
      
      var flightPlanCoordinates = [
          {lat: 37.772, lng: -122.214},
          {lat: 21.291, lng: -157.821},
          {lat: -18.142, lng: 178.431},
          {lat: -27.467, lng: 153.027}
        ];
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);

    },
    methods: {}
  }

</script>
