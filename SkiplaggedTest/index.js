const flightScanner = require('skiplagged-node-api');
 

var ticketArray = [];
for (let i = 1; i < 25; i++){

    let searchOptions = {
        from: 'LAX',
        to: 'HYD',
        //departureDate: '2018-10-'+concatZero(i),
        departureDate: '2018-10-03'
      };

      flightScanner(searchOptions).then(console.log);
}


function concatZero(i){
    if (i < 10){
        return '0'+i;
    }else{
        return i;
    }  
}
