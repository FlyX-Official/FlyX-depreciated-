const flightScanner = require('skiplagged-node-api');
 
var ticketArray = [];

for (let i = 1; i < 7; i++){
    let searchOptions = {
        from: 'LAX',
        to: 'CDG',
        departureDate: '2018-12-'+concatZero(i),
        partialTrips: true,
        sort: 'cost'
      };

      const promise = flightScanner(searchOptions).then(response =>{
          let ticket = {
            pennyPrice: 0,
            duration: '',
            depature: '',
            arrival: '',
            key: '',
            legs: []
          }

          ticket.pennyPrice = response[0].price_pennies;
          ticket.duration = response[0].durationSeconds;
          ticket.depature = response[0].departureTime;
          ticket.arrival = response[0].arrivalTime;
          ticket.key = response[0].flight_key;
          
          return ticket;
      });
      
      ticketArray.push( promise );
}

Promise.all( ticketArray ).then( ticketArray => {
  console.log(ticketArray.length);
  for(i in ticketArray){
      console.log(ticketArray[i]);
  }
});

function concatZero(i){
    if (i < 10){
        return '0'+i;
    }else{
        return i;
    }  
}
