
# node-skiplagged

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

Node.js wrapper for [Skiplagged](http://skiplagged.com), the hidden-city travel site. This library scrapes results from Skiplagged (the URL structure is fairly exposed) and formats the raw data for you to use.

**NOTICE**: Not complete, under active development.

## Installation 
```sh
$ npm install --save skiplagged
```

## Usage
```javascript
var Skiplagged = require('skiplagged');
var sl = new Skiplagged();

sl.flights('ORD', 'JFK', '2015-02-24', '2015-02-26');
```

## Sample response 
```json
[{
  "time": "5h",
  "startTime1": "3:17pm",
  "endTime1": "6:13pm",
  "startDate": "2015-02-14",
  "startDate": "2015-02-15",
  "flightNumber1": "1432",
  "startTime2": "7:05pm",
  "endTime2": "8:50pm",
  "flightNumber2": "1480",
  "layoverTime": "52m",
  "startAirport": "ORD",
  "layoverAirport": "CLT",
  "endAirport": "JFK",
  "price": "106",
  "airline": "American Airlines",
  "flightURL": "http://api.skiplagged.com/asplkdasddpoisakd",
  "tripLength": "3d"
},
{
  "time": "4h",
  "startTime1": "1:41pm",
  "endTime1": "2:51pm",
  ...
  ...
}]
```

## Uses
There are some very interesting uses for using Skiplagged data. For example, you could create a Mac OS X extension that notifies you whenever a flight is at a desired price.

## License 

[The MIT License](LICENSE)


[npm-url]: https://npmjs.org/package/skiplagged 
[npm-image]: https://badge.fury.io/js/skiplagged.svg
[travis-url]: https://travis-ci.org/xasos/node-skiplagged 
[travis-image]: https://travis-ci.org/xasos/node-skiplagged.svg?branch=master
[daviddm-url]: https://david-dm.org/xasos/node-skiplagged.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/xasos/node-skiplagged
