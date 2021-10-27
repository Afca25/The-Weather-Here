const latDiv = document.querySelector(.lat-div) 
const longDiv = document.querySelector(.long-div) 
 
 // --------- Check geolocation (geolocation browser object) --------
if ("geolocation" in navigator) {
  /* geolocation is available */
  console.log('Geolocation is available' + ' 🙂')
  navigator.geolocation.getCurrentPosition(async position => {
    console.log(position.coords.latitude, position.coords.longitude);
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    latPos.textContent = await latitude
    longPos.textContent = await longitude
  })
} else {
    /* geolocation is not available */
    console.log('Geolocation is NOT available ' + ' 🙁')
  }