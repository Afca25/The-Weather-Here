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
    
    submitBtn.addEventListener('click', async function () {
        
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