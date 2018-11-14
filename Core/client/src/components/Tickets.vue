<template>
  <div class="tickets-wrap">
    <div class="ticketLabel">Tickets</div>
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
    <div class="ticket" v-for="ticket in tickets" :key="ticket.key">
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
        <p>{{ convertSeconds(ticket.duration) }} hours</p>
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
        let time = parts[0]+':'+parts[1];
        return time;
      },
      removeDay: function (dateStr) {
        let parts = dateStr.split(',');
        let date = parts[1]+','+parts[2];
        return date;
      }
    }
  }

</script>
