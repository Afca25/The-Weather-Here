const dbDiv = document.querySelector('.database-container')
const ps = document.querySelectorAll('p')


window.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/api')
  const json = await res.json()

  for (const item of json) {
    let div = document.createElement('div')
    let latP = document.createElement('p')    
    latP.textContent = `Latitude: ${item.latitude}°`
    let longP = document.createElement('p')    
    longP.textContent = `Longitude: ${item.longitude}°`
    let timeP = document.createElement('p')    
    timeP.textContent = `Timestamp: ${item.timestamp}`

    div.append(latP, longP, timeP)
/*     div.style.backgroundColor = '#FF4B9A' */
    div.style.padding = '0.5px'
    div.style.margin = '5px'
    
    dbDiv.append(div)
  }
})