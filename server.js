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

//? ------------ GET methods --------------

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
  
  const weather_res = await fetch(weatherURL)
  const weather_json = await weather_res.json()
  
  //-------GET current AQ -----------
    const aq_url = `https://docs.openaq.org/v2/latest?coordinates=${lat}%2C${lon}`
    const aq_res = await fetch(aq_url)
    const aq_json = await aq_res.json()
    
    const data = {
      weather: weather_json,
      air_quality: aq_json
    }
    
    response.json(data)
})
