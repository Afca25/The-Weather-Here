const latPos = document.querySelector('.lat-div') 
const longPos = document.querySelector('.long-div') 
const submitBtn = document.querySelector('.submit-btn')
const weatherTitle = document.querySelector('.city')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const concentration = document.querySelector('.concentration')
const lastChecked = document.querySelector('.last-checked')

 
// --------- Check geolocation (geolocation browser object) --------
if ("geolocation" in navigator) {
  /* geolocation is available */
  console.log('Geolocation is available' + ' 🙂')
  navigator.geolocation.getCurrentPosition(async position => {
    try{
      console.log(position.coords.latitude, position.coords.longitude);
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      latPos.textContent = await `Latitude: ${latitude}°` 
      longPos.textContent = await `Longitude: ${longitude}°`
      
      //----------- GET current weather ----------
      const weather_innerURL = `/weather/${latitude},${longitude}`
      
      const respo = await fetch(weather_innerURL)
      const json2 = await respo.json()
      const d = console.log(json2)
      const tempData = `${json2.weather.main.temp}°`
      const weatherData = `${json2.weather.weather[0].description}`
      const cityName = json2.weather.name
      
      
      //---------- RENDER current weather ----------
      weatherTitle.textContent = `The weather in ${cityName} is:`
      weather.textContent = `${weatherData[0].toUpperCase()}${weatherData.slice(1)}`
      temperature.textContent = `with a temperature of ${tempData}C.`
      
      //---------- RENDER current weather ----------
      const aq_value = json2.air_quality.results[0].measurements[0].value
      const aq_unit = json2.air_quality.results[0].measurements[0].unit
      const aq_lastChecked = json2.air_quality.results[0].measurements[0].lastUpdated

      concentration.textContent = `The concentration of particulae matter is ${aq_value} ${aq_unit}, `
      lastChecked.textContent = `last read on ${aq_lastChecked}.`

      submitBtn.addEventListener('click', async function () {
        
        //-------- POST location to db --------------
        const timestamp = Date.now()
        const data = {latitude,longitude,timestamp}
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }

        const res = await fetch('/api', options)
        const json = await res.json()
        const dat = console.log(json)

        
        })
    } catch (error) {
      console.log('Something went wrong, my dude!', '\n' + error)
    }
  })
} else {
    /* geolocation is not available */
    console.log('Geolocation is NOT available ' + ' 🙁')
  }
/* async function fetchWeather() {
  const APIkey = '33231c152d824b0ca34e8e8553666ebf'
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=33231c152d824b0ca34e8e8553666ebf`
  
  const respo = await fetch(weatherURL)
  const json2 = await respo.json()
  const d = console.log(json2)
}
fetchWeather() */