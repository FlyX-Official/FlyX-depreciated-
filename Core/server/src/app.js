const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// Date parsing node module
const moment = require('moment');
//skiplagged node module
const flightScanner = require('skiplagged-node-api');

// Init App
const app = express()

// Setup middleware
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


// This block of code is just a reference for the .get method. It has no functionality
app.get('/myPosts', (req, res) => {
  res.send(
    [{
        id: 0,
        title: "Hello World!",
        description: "Hi there! How are you?"
      },
      {
        id: 1,
        title: "Hello World!",
        description: "Hi there! How are you?"
      }
    ]
  )
})

// This is the block of code that executes when the server recieves a post request
// with the '/search' endpoint.
app.post('/search', (req, res) => {

  // log that the form was submitted
  console.log('Form Submitted');

  // Extract the integers from the date string (uses moment library)
  var dateMoment = moment(req.body.date.start);
  var dayOfMonthInteger = dateMoment.date();
  var monthInteger = dateMoment.month() + 1;
  var yearInteger = dateMoment.year();

  // Extracts the integer from ending date, subtracts from starting date
  var endDateMoment = moment(req.body.date.end);

  // Get duration using moment, if difference is 0, input 1 instead, otherwise input difference
  var duration = (endDateMoment.diff(dateMoment, 'days')) == 0 ? 1 : endDateMoment.diff(dateMoment, 'days');
  // console.log(duration);

  // Extract source and destination airports
  var sourceAirport = req.body.from;
  var destAirport = req.body.to;

  sourceAirport = sourceAirport.toUpperCase();
  destAirport = destAirport.toUpperCase();

  // Get skiplagged ticket data and store into an array of Promises
  var ticketArray = getSkiplagged(sourceAirport, destAirport, yearInteger, monthInteger, dayOfMonthInteger, duration);

  // Once ALL promises in the ticketArray have resolved...send a response containing the ticketArray
  Promise.all(ticketArray).then(ticketArray => {
    res.send({
      tickets: ticketArray
    });
  });
});

//This function will pull ticket data from skiplagged API and return an array of ticket promises
function getSkiplagged(sourceAirport, destAirport, year, month, date, duration) {

  // create moment date object
  var dateMoment = moment().year(year).month(month - 1).date(date);

  // log the moment date object
  console.log(dateMoment);

  // create empty array to store ticket promises
  var ticketArray = [];

  // for-loop to iterate across multiple days (currently set up to search 7 days)
  for (let i = 0; i < duration; i++) {

    // create local search options object that we will pass into the skiplagged API
    let searchOptions = {
      from: sourceAirport,
      to: destAirport,
      departureDate: dateMoment.year() + '-' + concatZero(dateMoment.month() + 1) + '-' + concatZero(dateMoment.date()),
      partialTrips: true,
      sort: 'cost'
    };

    // This is a skiplagged API function that searches a single day
    const ticketPromise = flightScanner(searchOptions).then(response => {

      // create local ticket object to store the returned data
      let ticket = {
        from: sourceAirport,
        to: destAirport,
        pennyPrice: 0,
        duration: '',
        departure: '',
        arrival: '',
        key: '',
        legs: []
      }

      // populate the local ticket object with the return data
      ticket.pennyPrice = response[0].price_pennies;
      ticket.duration = response[0].durationSeconds;
      ticket.departure = response[0].departureTime;
      ticket.arrival = response[0].arrivalTime;
      ticket.key = response[0].flight_key;
      ticket.legs = response[0].legs;

      // return the local ticket object as a promise
      return ticket;
    });

    // push ticket promise into our ticketArray
    ticketArray.push(ticketPromise);

    // Increment the date by 1 day
    dateMoment.add(1, 'days');

  }
  // return array of ticket promises
  return ticketArray;
}

// function to concatinate a zero to a number if is below 10,
// this is for the skiplagged API data input
function concatZero(i) {
  if (i < 10) {
    return '0' + i;
  } else {
    return i;
  }
}

// This starts our server on localhost:8081
app.listen(process.env.PORT || 8081, function () {
  console.log('server started');
})