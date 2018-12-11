const express = require('express');
const app = express();
const elasticsearch = require('elasticsearch');
const cors = require('cors');
const bodyParser = require('body-parser');


app.set('port', process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());

const client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});

client.ping({
    requestTimeout: 30000
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});
var testData;
app.post('/search', function (req, res) {

    var postQuery = req.body.query;
    var postRadius = req.body.radius;
    console.log(postQuery + " " + postRadius);

    let body = {
        size: 100,
        from: 0,
        query: {
            match: {
                Combined: {
                    query: postQuery,
                    fuzziness: 0
                }
            }
        }
    }

    client.search({
            index: 'vue-elastic',
            body: body,
            type: 'characters_list'
        })
        .then(results => {
            console.log(results.hits.hits);
            testData = results.hits.hits[0]._source.location1;
            console.log(testData);
            getCitiesInRadius(postRadius,testData,res);
            
            //console.log('Original City: '+testData+' Cities in Radius: '+citiesInRadius);
          
            //res.send(citiesInRadius);

        })
        .catch(err => {
            console.log(err)
            res.send([]);
        });

});


app.get('upflights/_search', function (req, res) {



});

function getCitiesInRadius(radius, geoHash, res) {

    let body = {
        size: 100,
        query: {
            bool: {
                must: {
                    match_all: {}
                },
                filter: {
                    geo_distance: {
                        distance: radius + "mi",
                        location: geoHash
                    }
                }
            }
        }
    }

    client.search({
            index: 'upflights',
            body: body,
            type: ''
        })
        .then(results => {
            //console.log(results.hits.hits);
           // return results.hits.hits;
            //otherCities = results.hits.hits[2]._source.Origin;
            res.send(results.hits.hits);
            //console.log(otherData);
        })
        .catch(err => {
            console.log(err)
            res.send([]);
        });

}

app.listen(app.get('port'), function () {
    console.log('Your node.js server is running on PORT: ', app.get('port'));
});