<template>
  <div class="tickets-wrap">
    <div class="ticketLabel">Tickets</div>
    <div id="simpleModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="closeBtn" v-on:click="closedetails">&times;</span>
          <h2>Ticket Details</h2>
        </div>
        <div class="modal-body">
          <div>
            <h2 id="text1"> Leave From:  </h2>
            <p id="ticketfrom"></p>
          </div>
          <div>
            <h2 id="text2"> Arive In: </h2>
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
            <h2 id="text5"> Departure Date: </h2>
            <p id="ticketdeparture"></p>
          </div>
          <div>
            <h2 id="text6"> Arrival Date:  </h2>
            <p id="ticketarrival"></p>
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
    <div class="ticket" v-on:click="displayticketdetails(ticket)" v-for="ticket in tickets" :key="ticket.pennyPrice" >
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
</template>
<script>
/* eslint-disable */
  export default {
    name: 'tickets',
    data() {
      return {
        // Instance(component) bound ticket array
        tickets: []
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
        var date = new Date(null);
        date.setSeconds(seconds); 
        var timeString = date.toISOString().substr(11, 8);

        let parts = timeString.split(':');
        let time = parts[0]+' Hours '+parts[1]+' minutes';
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
        document.getElementById("ticketfrom").innerHTML = ticket.from;
        document.getElementById("ticketto").innerHTML = ticket.to;
        document.getElementById("ticketairline").innerHTML= ticket.legs["0"].airline;
        document.getElementById("ticketduration").innerHTML = this.convertSeconds(ticket.duration);
        document.getElementById("ticketarrival").innerHTML = ticket.arrival;
        document.getElementById("ticketdeparture").innerHTML = ticket.departure;
        document.getElementById("ticketprice").innerHTML = '$' + this.convertPennies(ticket.pennyPrice);
        console.log(ticket);
        
      },
      closedetails: function (event) {
        var modal= document. getElementById('simpleModal');
        modal.style.display = "none";
      },
    },
    computed: {
      sortedTickets: function() {
      function compare(a, b) {
        if (a.pennyPrice < b.pennyPrice)
          return -1;
        if (a.pennyPrice > b.pennyPrice)
          return 1;
        return 0;
      }
      return this.tickets.sort(compare);
      },
    }
  }

</script>
