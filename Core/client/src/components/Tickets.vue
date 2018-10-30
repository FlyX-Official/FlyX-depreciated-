<template>
  <div class="tickets-wrap">
    <div class="ticketLabel">Tickets</div>
    <!--
      You have access to these ticket attributes:
        arrival: (...)
        depature: (...)
        duration: (...)
        from: (...)
        key: (...)
        legs: Array(2)
        pennyPrice: (...)
        to: (...)
    -->
    <div class="ticket" v-for="ticket in tickets" :key="ticket.key">
      <p>
        <span>From: {{ ticket.from}}</span><br>
        <span>To: {{ ticket.to }}</span><br>
        <span>Price: ${{ convertPennies(ticket.pennyPrice) }}</span>
      </p>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
  export default {
    name: 'tickets',
    data() {
      return {
        tickets: []
      }
    },
    mounted() {
      this.$root.$on('ticketComm', data => {
        this.tickets = data.tickets;
        console.log(data);
      });
    },
    methods: {
      convertPennies: function (price) {
        return price/100;
      }
    }
  }

</script>
