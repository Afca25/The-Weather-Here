const express = require ('express')

const app = express()
app.listen(3000,() => console.log('Listening at 3000...'))
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))


//? ---------- POST method -----------

app.post('/api', (request, response) => {
  console.log('I got a request')
  const data = request.body

  response.json(data)
})

//? ------------ GET method --------------

app.get(('/api'), (request, response) => {
  
  response.json(data)
})
