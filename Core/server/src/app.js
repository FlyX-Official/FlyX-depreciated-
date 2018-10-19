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

// Setup our middleware
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
  console.log('Form Submitted');

  var dateMoment = moment(req.body.date);
  var dayOfMonthInteger = dateMoment.date();
  var monthInteger = dateMoment.month() + 1;
  var yearInteger = dateMoment.year();

  // The res.send() block of code sends a RESPONSE to the client.
  res.send({
    message: `From: ${req.body.from}, To: ${req.body.to}, Radius: ${req.body.radius}, Day: ${dayOfMonthInteger}, Month: ${monthInteger}, Year: ${yearInteger}`
  });
});

//This function will pull all the data from skiplagged API and store in array
function getSkiplagged(sourceAirport, destAirport, year, date, month){

}

// This starts our server on localhost:8081
app.listen(process.env.PORT || 8081, function(){
  console.log('server started');
})