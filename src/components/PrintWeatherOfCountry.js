import React from 'react'

const PrintWeatherOfCountry = ({name, temperature, icon, description, windspeed, winddirection}) =>{
    return (
    <div>
      <h1>Weather in: {name}</h1>
      <p><strong>Temperature:</strong> {temperature}° Celcius</p>
      <img src={icon} width={120} alt={'Icon of weather'}></img>
      <p><strong>{description}</strong></p>
      <p><strong>Wind speed: </strong>{windspeed} m/ph</p>
      <p>Direction: <strong>{winddirection}</strong></p>
    </div>
    )
}

export default PrintWeatherOfCountry