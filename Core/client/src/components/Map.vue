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
      lines: []
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
      
      this.getGeohash(this.tickets, Geohash);
      //console.log(this.lines);
      this.removeLines(map, this.lines);
      this.addLines(map, this.lines);
      //this.removeLines(map, this.lines)
    
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
            "line-width": 2
          }
        });
      }

    },
    removeLines: function (map, arr){
      for(let i = 0; i < arr.length; i++){
        if(map.getLayer('route' + i)){
          map.removeLayer('route' + i);
          map.removeSource('route' + i);
        }
        
        // map.removeLayer('route' + i);
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
