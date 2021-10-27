const express = require('express')
const app = express()
const Datastore = require('nedb')
const database = new Datastore('database.db')

app.listen(3000,() => console.log('Listening at 3000...'))
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))
database.loadDatabase()


//! To delete all the content from the database uncomment this (and run server twice)
/* database.remove({}, { multi: true }, function (err, numRemoved) {}) */


//? ---------- POST method -----------

app.post('/api', (request, response) => {
  console.log('I got a request')
  const data = request.body

  response.json(data)
})

//? ------------ GET method --------------

app.get(('/api'), (request, response) => {
  database.find({}, (err, data) => {

    response.json(data)
  })
})
