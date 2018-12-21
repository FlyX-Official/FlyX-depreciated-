<template>
  <div class="map-wrap">
    <div id="mapboxgl-map"></div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "flightMap",
  data() {
    return {
      // Instance(component) bound ticket array
      tickets: [],
      accessToken:"pk.eyJ1IjoiYnJ5Y2VyZW1pY2siLCJhIjoiY2pvZXhsdzVkMzFjeDNxcHVqaXFnZ3YwaSJ9.rt7slaDCfr_grOygun_Qqg",
      mapStyle: "mapbox://styles/bryceremick/cjoexz6d50ffw2ro6qewq3enb",
      lines: [],
      deleteLines: false
    };
  },
  mounted() {
    var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
    var Geohash = require('latlon-geohash');
    mapboxgl.accessToken = this.accessToken;

    var map = new mapboxgl.Map({
      container: "mapboxgl-map",
      style: this.mapStyle,
      center: [-28.6731, 14.5994],
      zoom: 1.5
    });

    // This block listens for a 'ticketComm' event and then stores the data
    // that was emitted into our local 'tickets' array.
    this.$root.$on("ticketComm", data => {

      console.clear();

      this.tickets = data.tickets;
      
      if(this.deleteLines){
        this.removeLines(map, this.lines);
      }

      this.getGeohash(this.tickets, Geohash);
      this.addLines(map, this.lines);
      this.deleteLines = true;
    });
  },
  methods: {
    addLines: function(map, arr) {

      for (let i = 0; i < arr.length; i++) {
        map.addLayer({
          id: "route" + i,
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: arr[i]
              }
            }
          },
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#ff0000",
            "line-width": 1
          }
        });
      }

    },
    removeLines: function (map, arr){
      for(let i = 0; i < arr.length; i++){
        
        let route = 'route' + i;
        let visibility = map.getLayoutProperty(route, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(route, 'visibility', 'none');
        } else {
            map.setLayoutProperty(route, 'visibility', 'visible');
        }

      }
    },
    getGeohash: function(tickets, Geohash){
      // var destinationArr = [];
      

      for(let i = 0; i < tickets.length; i++){
         var lineArr = [];
        var source = [];
        var dest = [];

        var sourceLongLat = Geohash.decode(tickets[i].sourceLocation);
        var destinationLongLat = Geohash.decode(tickets[i].destLocation);

        source.push(sourceLongLat.lon);
        source.push(sourceLongLat.lat);
        lineArr.push(source);


        dest.push(destinationLongLat.lon);
        dest.push(destinationLongLat.lat);
        lineArr.push(dest);
        
        this.lines.push(lineArr);
//[[lon, lat][lon,lat]]
      }

        //console.log(sourceLongLat);
    }   
      //  console.log(sourceArr);
        // console.log(this.coords);
  },
};
</script>
