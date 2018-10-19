var airports = require('./');

console.log(airports.findWhere({ iata_code: 'LAX' }).get('name'));
