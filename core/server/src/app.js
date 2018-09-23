const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


/*
What the block of code below does:
    When a user goes to the homepage (denoted by '/'), the server sends
    back the array of posts below. In other words, when server gets a 
    '/' request, it sends the array as a response. We can then manipulate
    that array on the front end in vue.
*/
app.get('/', (req, res) => {
    res.send(
      [
        {
            id : '0',
            title: "post 1",
            description: "Element 0 of a backend JSON array"
        },
        {
            id : '1',
            title: "post 2",
            description: "Element 1 of a backend JSON array"
        },
    ]
    )
  })

app.listen(process.env.PORT || 8081)