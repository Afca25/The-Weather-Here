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
      const tempData = `${json2.weather.main.temp}°C`
      const weatherData = `${json2.weather.weather[0].description}`
      const cityName = json2.weather.name
      
      
      
      //---------- RENDER current weather ----------
      weatherTitle.textContent = `The weather in ${cityName} is:`
      weather.textContent = `${weatherData[0].toUpperCase()}${weatherData.slice(1)}`
      temperature.textContent = `with a temperature of ${tempData}.`
      
      //---------- RENDER current weather ----------
    if(!json2.air_quality.results.length == 0) {
      let aq_value = json2.air_quality.results[0].measurements[0].value
      let aq_unit = json2.air_quality.results[0].measurements[0].unit
      let aq_lastChecked = json2.air_quality.results[0].measurements[0].lastUpdated
      let air = json2.air_quality.results[0].measurements[0]
      
      concentration.textContent = `The concentration of particulae matter is ${aq_value} ${aq_unit}, `
      lastChecked.textContent = `last read on ${aq_lastChecked}.`

    }else {
      aq_value = 'There are still no records for air quality here'
      aq_unit = ''
      aq_lastChecked = ''
      air = 'There are no records yet' 

      concentration.textContent = `${aq_value}`
      lastChecked.textContent = ``

      console.log('HEY dummy' + json2.air_quality.results.length) 
    }


      submitBtn.addEventListener('click', async function () {
        
        //-------- POST location to db --------------
        const timestamp = Date.now()
        const data = {latitude,longitude,timestamp, air,tempData,weatherData, cityName}
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
      console.log(json2.weather/* , '/n' + air_quality */)
    
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