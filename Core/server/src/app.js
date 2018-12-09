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
  duration++;

  // Extract source and destination airports
  var sourceAirport = req.body.from;
  var destAirport = req.body.to;

  sourceAirport = sourceAirport.toUpperCase();
  destAirport = destAirport.toUpperCase();

  // Use this line to do single matchup search (uses user input as parameters)
  var ticketArray = getSkiplagged(sourceAirport, destAirport, yearInteger, monthInteger, dayOfMonthInteger, duration);

  // Use this line to do radius search using the test dummy data (testSource & testDest)
  //var ticketArray = radiusSearch(testSource, testDest, yearInteger, monthInteger, dayOfMonthInteger, duration);

  // Once ALL promises in the ticketArray have resolved...send a response containing the ticketArray
  Promise.all(ticketArray).then(ticketArray => {

    // This filters out any tickets that were undefined (the airports did not have any flights between them)
    var filteredTickets = ticketArray.filter(function (value, index, arr) {
      return value.pennyPrice > 0;
    });
    
    res.send({
      tickets: filteredTickets
    });
  });
});

// TEST DATA
var testSource = {
  "took": 1,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 4,
    "max_score": 1,
    "hits": [{
        "_index": "upflights",
        "_type": "_doc",
        "_id": "JeXLkmYBfxbUkpbiIxwJ",
        "_score": 1,
        "_source": {
          "Airportcode": "LAX",
          "location": "9q5c1e1cmsy1",
          "OriginCity": "Los Angeles"
        }
      },
      {
        "_index": "upflights",
        "_type": "_doc",
        "_id": "B-XLkmYBfxbUkpbiIBzC",
        "_score": 1,
        "_source": {
          "Airportcode": "EDW",
          "location": "9qhnt6r6xtur",
          "OriginCity": "Edwards"
        }
      },
      {
        "_index": "upflights",
        "_type": "_doc",
        "_id": "Q-XLkmYBfxbUkpbiJRxq",
        "_score": 1,
        "_source": {
          "Airportcode": "ONT",
          "location": "9qh3eztwd4kr",
          "OriginCity": "Ontario"
        }
      },
      {
        "_index": "upflights",
        "_type": "_doc",
        "_id": "ZuXLkmYBfxbUkpbiKBwR",
        "_score": 1,
        "_source": {
          "Airportcode": "SNA",
          "location": "9muptf7phtey",
          "OriginCity": "Santa Ana"
        }
      }
    ]
  }
};

// TEST DATA
var testDest = {
  "took": 3,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 4,
    "max_score": 1,
    "hits": [{
        "_index": "upflights",
        "_type": "_doc",
        "_id": "SuXLkmYBfxbUkpbiJRzx",
        "_score": 1,
        "_source": {
          "Airportcode": "PHL",
          "location": "dr46zf7neks5",
          "OriginCity": "Philadelphia"
        }
      },
      {
        "_index": "upflights",
        "_type": "_doc",
        "_id": "IuXLkmYBfxbUkpbiIhzJ",
        "_score": 1,
        "_source": {
          "Airportcode": "JFK",
          "location": "dr5x1n7b5008",
          "OriginCity": "New York"
        }
      },
      {
        "_index": "upflights",
        "_type": "_doc",
        "_id": "CuXLkmYBfxbUkpbiIRwA",
        "_score": 1,
        "_source": {
          "Airportcode": "EWR",
          "location": "dr5r2rb50000",
          "OriginCity": "Newark"
        }
      },
      {
        "_index": "upflights",
        "_type": "_doc",
        "_id": "K-XLkmYBfxbUkpbiIxx5",
        "_score": 1,
        "_source": {
          "Airportcode": "LGA",
          "location": "dr5ryzr87sz3",
          "OriginCity": "New York"
        }
      }
    ]
  }
};

// This function takes the return data of elasticsearch radius search and 
// consolidates it, returning an array of objects, each obj containing airport matchups.
// eg. [{sourceCode: 'LAX',destCode: 'JFK'},{sourceCode: 'LAX',destCode: 'PHL'},...]
function matchAirports(testSource, testDest) {

  var airportCodePairs = [];

  for (var i = 0; i < testSource.hits.hits.length; i++) {
    for (var j = 0; j < testDest.hits.hits.length; j++) {
      let matchup = {
        sourceCode: '',
        destCode: ''
      };

      matchup.sourceCode = testSource.hits.hits[i]._source.Airportcode;
      matchup.destCode = testDest.hits.hits[j]._source.Airportcode;
      airportCodePairs.push(matchup);
    }
  }
  //console.log(airportCodePairs);
  return airportCodePairs;
}

function radiusSearch(testSource, testDest, year, month, date, duration) {

  var ticketArray = [];

  var airportCodePairs = matchAirports(testSource, testDest);

  for (var i = 0; i < airportCodePairs.length; i++) {
    let singleMatchupTickets = getSkiplagged(airportCodePairs[i].sourceCode, airportCodePairs[i].destCode, year, month, date, duration);
    ticketArray = ticketArray.concat(singleMatchupTickets);
  }

  return ticketArray;
}

//This function will pull ticket data from skiplagged API and return an array of ticket promises
function getSkiplagged(sourceAirport, destAirport, year, month, date, duration) {

  // create moment date object
  var dateMoment = moment().year(year).month(month - 1).date(date);

  // log the moment date object
  //console.log(dateMoment);

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

      if (typeof response[0] !== "undefined") {
        // populate the local ticket object with the return data
        ticket.pennyPrice = response[0].price_pennies;
        ticket.duration = response[0].durationSeconds;
        ticket.departure = response[0].departureTime;
        ticket.arrival = response[0].arrivalTime;
        ticket.key = response[0].flight_key;
        ticket.legs = response[0].legs;
      }

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