import React from 'react'

const PrintListOfCountries = ({name, warning, index, getOne}) =>{
    if(warning){
      return <h1>{warning}</h1>
    } else {
      return (
        <div>
          <p key={index}>{name}  <button onClick={getOne}>Show</button></p>
        </div>
        )
    }
}

export default PrintListOfCountries