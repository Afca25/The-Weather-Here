const dbDiv = document.querySelector('.database-container')
const ps = document.querySelectorAll('p')


window.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/api')
  const json = await res.json()

  for (const item of json) {
    let div = document.createElement('div')
    let cityP = document.createElement('p')
    cityP.textContent = `City: ${item.cityName}`
    let latP = document.createElement('p')    
    latP.textContent = `Latitude: ${item.latitude}°`
    let longP = document.createElement('p')    
    longP.textContent = `Longitude: ${item.longitude}°`
    let timeP = document.createElement('p')    
    timeP.textContent = `Timestamp: ${item.timestamp}`
    let weatherP = document.createElement('p')    
    weatherP.textContent = `Weather: ${item.weatherData}`
    let tempP = document.createElement('p')    
    tempP.textContent = `Temperature: ${item.tempData}`
    let airP = document.createElement('p')    
    airP.textContent = `Concentration: ${item.air.value} ${item.air.unit}`
    let lastCheckedP = document.createElement('p')    
    lastCheckedP.textContent = `Last updated: ${item.air.lastUpdated}`

    div.append(cityP, latP, longP, timeP, weatherP, tempP, airP, lastCheckedP)
/*     div.style.backgroundColor = '#FF4B9A' */
    div.style.padding = '0.5px'
    div.style.margin = '5px'
    
    dbDiv.append(div)
  }
})