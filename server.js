const express = require('express')
const app = express()
const Datastore = require('nedb')
const database = new Datastore('database.db')
const fetch = require('node-fetch')


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
  database.insert(data)
  response.json(data)
})

//? ------------ GET method --------------

app.get(('/api'), (request, response) => {
  database.find({}, (err, data) => {
    response.json(data)
  })
})

app.get(('/weather/:latlon'), async (request, response) => {
  const latlon = request.params.latlon.split(',')
  const lat = latlon[0]
  const lon = latlon[1]
  const APIkey = '33231c152d824b0ca34e8e8553666ebf'
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`
  
  const respo = await fetch(weatherURL)
  const json2 = await respo.json()
  response.json(json2)
})
