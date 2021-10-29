const dbDiv = document.querySelector('.database-container')
const ps = document.querySelectorAll('p')

const checkMap = L.map('mapid').setView([0, 0], 1.2)
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })

tiles.addTo(checkMap)


window.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/api')
  const json = await res.json()
  
  for (const item of json) {
    
    let div = document.createElement('div')
    
    let cityP = document.createElement('p')
    let cityA = document.createElement('a')
    cityA.textContent = `City: ${item.cityName}`
    cityA.src = ''
    cityP.append(cityA)
    
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
    
    let lastCheckedP = document.createElement('p')    
    
    if(item.air.value || item.air.value == 0) {
      
      airP.textContent = `Concentration: ${item.air.value} ${item.air.unit}`
      
      lastCheckedP.textContent = `Last updated: ${item.air.lastUpdated}`
    } else {
      airP.textContent = `Concentration: No records yet`
      
      lastCheckedP.textContent = `Last updated: No records yet`
      
    }
    
    
    div.append(cityP, latP, longP, timeP, weatherP, tempP, airP, lastCheckedP)
    div.classList.add('card')
    const marker = L.marker([item.latitude, item.longitude]).addTo(checkMap)
    marker.bindPopup(`${cityA.textContent}`).openPopup();
    dbDiv.append(div)
  }
})
