<template>
  <div class="tickets-wrap">
    <!-- <div v-for="ticket in tickets" :key="ticket.key">
      <p>
        <span><b>{{ ticket.pennyPrice}}</b></span><br />
        <span>{{ ticket.key }}</span>
      </p>
    </div> -->
  </div>
</template>
<!-- <script>
/* eslint-disable */
  import TicketsService from '@/services/TicketsService'

  export default {
    name: 'tickets',
    data() {
      return {
        tickets: []
      }
    },
    mounted() {
      this.getTickets()
    },
    methods: {
      async getTickets() {
        const response = await TicketsService.fetchTickets()
        this.tickets = response.data
      }
    }
  }

</script> -->
