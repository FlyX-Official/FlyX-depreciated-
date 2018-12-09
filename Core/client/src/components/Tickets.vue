<template>
  <div class="tickets-wrap">
    <div class="ticketLabel">Tickets</div>
    <input type="radio" name="sortby" v-on:click ="togglesortbydate"> Date<br>
    <input type="radio" name="sortby" v-on:click="togglesortbyprice"> Price<br>
    <input type="radio" name="sortby" v-on:click="togglesortbyduration"> Duration<br>
    <div id="simpleModal" class="modal" v-on:click.self="closedetails($event)">
      <div class="modal-content">
        <div class="modal-header">
          <span class="closeBtn" v-on:click="closedetails">&times;</span>
          <h2>Ticket Details</h2>
        </div>
        <div class="modal-body" v-on:click="modalstayopen">
          <div>
            <h2 id="text1"> Leave From:  </h2>
            <p id="ticketfrom"></p>
          </div>
          <div>
            <h2 id="text2"> Arive At: </h2>
            <p id="ticketto"></p>
          </div>
          <div>
            <h2 id="text3"> Airline:  </h2>
            <p id="ticketairline"></p>
          </div>
          <div>
            <h2 id="text4"> Duration:  </h2>
            <p id="ticketduration"></p>
          </div>
          <div>
            <h2 id="text5"> Departure: </h2>
            <p id="ticketdeparture"></p>
          </div>
          <div>
            <h2 id="text6"> Arrival:  </h2>
            <p id="ticketarrival"></p>
          </div>
          <div class="modalticketlegs">
            <h2 id="text7"> Legs:  </h2>
            <p id="ticketlegs"></p>
            <p id="ticketlegs2"></p>
            <p id="ticketlegs3"></p>
          </div>
          <div>
            <p id="ticketprice"></p>
          </div>
        </div>
      </div>
    </div>
    <!--
      You have access to these ticket attributes:
        arrival: (...)
        depature: (...)
        duration: (...)
        from: (...)2
        key: (...)
        legs: Array(2)
        pennyPrice: (...)
        to: (...)
    -->
    <div v-if='sortbydate'>
      <div class="ticket" v-on:click="displayticketdetails(ticket)" v-for="ticket in tickets" :key="ticket.key" >
        <div class="ticket-from-to">
          <p>{{ ticket.from }}</p>
          <img src="../assets/Divider.svg">
          <p>{{ ticket.to }}</p>
        </div>
        <div class="ticket-price">
          <p>${{ convertPennies(ticket.pennyPrice) }}</p>
        </div>
        <div class="ticket-color"></div>
        <div class="ticket-departure">
          <img src="../assets/plane-departure.svg"><p>{{ removeDay(ticket.departure) }}</p>
        </div>
        <div class="ticket-return">
          <img src="../assets/plane-arrival.svg"><p>{{ removeDay(ticket.legs[(ticket.legs.length-1)].arrivalTime) }}</p>
        </div>
        <div class="ticket-duration-legs">
          <p>{{ ticket.legs.length }} Legs</p>
        </div>
      </div>
    </div>
    <div v-else-if='sortbyprice'>
      <div class="ticket" v-on:click="displayticketdetails(ticket)" v-for="ticket in pricetickets" :key="ticket.key" >
        <div class="ticket-from-to">
          <p>{{ ticket.from }}</p>
          <img src="../assets/Divider.svg">
          <p>{{ ticket.to }}</p>
        </div>
        <div class="ticket-price">
          <p>${{ convertPennies(ticket.pennyPrice) }}</p>
        </div>
        <div class="ticket-color"></div>
        <div class="ticket-departure">
          <img src="../assets/plane-departure.svg"><p>{{ removeDay(ticket.departure) }}</p>
        </div>
        <div class="ticket-return">
          <img src="../assets/plane-arrival.svg"><p>{{ removeDay(ticket.legs[(ticket.legs.length-1)].arrivalTime) }}</p>
        </div>
        <div class="ticket-duration-legs">
          <p>{{ ticket.legs.length }} Legs</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="ticket" v-on:click="displayticketdetails(ticket)" v-for="ticket in durationtickets" :key="ticket.key" >
        <div class="ticket-from-to">
          <p>{{ ticket.from }}</p>
          <img src="../assets/Divider.svg">
          <p>{{ ticket.to }}</p>
        </div>
        <div class="ticket-price">
          <p>${{ convertPennies(ticket.pennyPrice) }}</p>
        </div>
        <div class="ticket-color"></div>
        <div class="ticket-departure">
          <img src="../assets/plane-departure.svg"><p>{{ removeDay(ticket.departure) }}</p>
        </div>
        <div class="ticket-return">
          <img src="../assets/plane-arrival.svg"><p>{{ removeDay(ticket.legs[(ticket.legs.length-1)].arrivalTime) }}</p>
        </div>
        <div class="ticket-duration-legs">
          <p>{{ ticket.legs.length }} Legs</p>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
/* eslint-disable */
  export default {
    name: 'tickets',
    data() {
      return {
        // Instance(component) bound ticket array
        tickets: [],
        pricetickets: [],
        durationtickets: [], 
        sortbydate: true,
        sortbyprice: true
      }
    },
    mounted() {
      // This block listens for a 'ticketComm' event and then stores the data
      // that was emitted into our local 'tickets' array.
      this.$root.$on('ticketComm', data => {
        this.tickets = data.tickets;

      });
    },
    methods: {
      // Function to convert the penny price into a real dollar amount
      convertPennies: function (price) {
        return (price/100).toFixed(2);
      },
      convertSeconds: function (seconds) {
        var hours = Math.floor(seconds/3600);
        var minutes = Math.floor((seconds%86400)%3600/60);
        var time = hours + ' hours, ' + minutes + ' minutes';
        
        return time;
      },
      removeDay: function (dateStr) {
        let parts = dateStr.split(',');
        let date = parts[1]+','+parts[2];
        return date;
      },
      displayticketdetails: function (ticket) {
        var modal= document. getElementById('simpleModal');
        modal.style.display = 'block';
        document.getElementById("ticketfrom").innerHTML = ticket.legs["0"].departingFrom;
        document.getElementById("ticketto").innerHTML = ticket.legs[(ticket.legs.length-1)].arrivingAt;
        document.getElementById("ticketairline").innerHTML= ticket.legs["0"].airline;
        document.getElementById("ticketduration").innerHTML = this.convertSeconds(ticket.duration);
        document.getElementById("ticketarrival").innerHTML = ticket.legs[(ticket.legs.length-1)].arrivalTime;
        document.getElementById("ticketdeparture").innerHTML = ticket.departure;
        document.getElementById("ticketprice").innerHTML = '$' + this.convertPennies(ticket.pennyPrice);
        if(ticket.legs.length == 2) {
          document.getElementById("ticketlegs").innerHTML = 'Arrive in ' + ticket.legs["0"].arrivingAt + ' on ' + ticket.legs["0"].arrivalTime + ' Leave on ' + ticket.legs["1"].departureTime;
        }
        else if(ticket.legs.length == 3){
          document.getElementById("ticketlegs").innerHTML = 'Arrive in ' + ticket.legs["0"].arrivingAt + ' on ' + ticket.legs["0"].arrivalTime + ' Leave on ' + ticket.legs["1"].departureTime;
          document.getElementById("ticketlegs2").innerHTML = 'Arrive in ' + ticket.legs["1"].arrivingAt + ' on ' + ticket.legs["1"].arrivalTime + ' Leave on ' + ticket.legs["2"].departureTime;
        }
        else if(ticket.legs.length == 4){
          document.getElementById("ticketlegs").innerHTML = 'Arrive in ' + ticket.legs["0"].arrivingAt + ' on ' + ticket.legs["0"].arrivalTime + ' Leave on ' + ticket.legs["1"].departureTime;
          document.getElementById("ticketlegs2").innerHTML = 'Arrive in ' + ticket.legs["1"].arrivingAt + ' on ' + ticket.legs["1"].arrivalTime + ' Leave on ' + ticket.legs["2"].departureTime;
          document.getElementById("ticketlegs3").innerHTML = 'Arrive in ' + ticket.legs["2"].arrivingAt + ' on ' + ticket.legs["2"].arrivalTime + ' Leave on ' + ticket.legs["3"].departureTime;
        }
        else{
          document.getElementById("ticketlegs").innerHTML = 'none';
          document.getElementById("ticketlegs2").innerHTML = '';
          document.getElementById("ticketlegs3").innerHTML = '';

        }
        console.log(ticket);

      },
      closedetails: function () {
        var modal= document. getElementById('simpleModal');
        modal.style.display = "none";
      },
      modalstayopen: function (event) {
        var modal= document. getElementById('simpleModal');
        modal.style.display = "block";
      },
      togglesortbydate: function () {
        this.sortbydate=true;
        this.sortbyprice=true;
        console.log(this.tickets);
      },
      togglesortbyprice: function () {
        var i;
        var j;
        var min;
        var temp = this.tickets.slice();
        this.pricetickets = temp;
        for (i =0; i< this.pricetickets.length-1; i++){
            min=i;
            for (j = i+1; j< this.pricetickets.length; j++){
              if(this.pricetickets[min].pennyPrice > this.pricetickets[j].pennyPrice){
                min = j;
              }
            } 
            var temp = this.pricetickets[i];
            this.pricetickets[i]= this.pricetickets[min];
            this.pricetickets[min]=temp;
          }
        this.sortbyprice=true;
        this.sortbydate=false;
        console.log(this.pricetickets);
      },
      togglesortbyduration: function () {
        var i;
        var j;
        var min;
        this.durationtickets = this.tickets.slice();
        for (i =0; i< this.durationtickets.length-1; i++){
            min=i;
            for (j = i+1; j< this.durationtickets.length; j++){
              if(this.durationtickets[min].duration > this.durationtickets[j].duration){
                min = j;
              }}
            var temp = this.durationtickets[i];
            this.durationtickets[i]= this.durationtickets[min]
            this.durationtickets[min]=temp;
        }
        this.sortbydate=false;
        this.sortbyprice=false;
        console.log(this.durationtickets);
      },
      displayarrays: function () {
        console.log(this.tickets);
        console.log(this.pricetickets);
        console.log(this.durationtickets);
      }
    },
    
    }
    
  

</script>
