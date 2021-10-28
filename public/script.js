const latPos = document.querySelector('.lat-div') 
const longPos = document.querySelector('.long-div') 
const submitBtn = document.querySelector('.submit-btn')
 
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