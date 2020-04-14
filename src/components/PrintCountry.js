import React from 'react'

const PrintCountry = ({name, capital, population, flag, language, index}) =>{
    return (
    <div>
        <h1 key={index}>{name}</h1>
        <p>Capital: {capital}</p> 
        <p>Population: {population}</p>
        <h2>Languages</h2>
        <ul>
        {language.map((element, index) => {
            return <li key={index}>{element.name}</li>
        })}
        </ul>
        <img src={flag} width={240} alt={'country flag'}></img>
    </div>
    ) 
}

export default PrintCountry