<template>
  <div class="map-wrap">
    <!--<iframe src="https://search-wefly-ndmsaxpla3qpn2wtwbevnaig24.us-west-1.es.amazonaws.com/_plugin/kibana/app/kibana#/visualize/edit/051f9230-cd6b-11e8-99ce-bd7196a584c5?embed=true&_g=()"></iframe>-->
  <div id="mapboxgl-map"></div>
  </div>
</template>

<script>
/* eslint-disable */
  
  export default {
    name: 'flightMap',
    data() {
      return {
        // Instance(component) bound ticket array
        tickets: [],
        accessToken: 'pk.eyJ1IjoiYnJ5Y2VyZW1pY2siLCJhIjoiY2pvZXhsdzVkMzFjeDNxcHVqaXFnZ3YwaSJ9.rt7slaDCfr_grOygun_Qqg', 
        mapStyle: 'mapbox://styles/bryceremick/cjoexz6d50ffw2ro6qewq3enb',
      }
    },
    mounted() {
      // This block listens for a 'ticketComm' event and then stores the data
      // that was emitted into our local 'tickets' array.
      this.$root.$on('ticketComm', data => {
        this.tickets = data.tickets;
      });

      var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
      mapboxgl.accessToken = this.accessToken;

      var map = new mapboxgl.Map({
        container: 'mapboxgl-map',
        style: this.mapStyle,
        center: [-28.6731, 14.5994],
        zoom: 1.5
      });
    map.on('load', function () {
      var latLongArr = [
        [[-119.7871, 36.7378],[2.5479, 49.0097]],
        [[-122.3321, 47.6062],[-73.7781, 40.6413]],
        [[-104.9903, 39.7392],[-46.6333, -23.5505]]
      ];
      for (let i = 0; i < latLongArr.length; i++){
          map.addLayer({
        "id": 'route'+i,
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": latLongArr[i]
                }
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": '#ff0000',
            "line-width": 2
        }
        });
        }
    
    });

    },
    methods: {
      addLine: function (map, source, dest) {

      },
      addLines: function (map, arr) {
        
      }
    }
  }

</script>
