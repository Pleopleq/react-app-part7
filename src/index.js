import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



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

const PrintCountry = ({name, capital, population, flag, language}) =>{
  return (
  <div>
    <h1>{name}</h1>
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

const App = () => {
  const [countries, setContries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState([]);

  const handleSearchBarChange = event =>{
    setNewSearch(event.target.value);
    setSelectedCountry([])
  }

  const handleShowClick = (event) =>{
    let name = event.target.parentNode.innerText.replace('Show','')
    axios
    .get(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
      setSelectedCountry(response.data)
    })
  }

  const countryToSearch = newSearch;

  const copyOfContries = countries;

  let countryToSearchToUpper = '';

  //Make the first letter of the search query uppercase
  if(countryToSearch !== ''){
    countryToSearchToUpper = countryToSearch.charAt(0).toUpperCase() + countryToSearch.substring(1);
  }

  let searchBar = copyOfContries.filter(el => el.name.includes(countryToSearchToUpper));
  //Set the countries array to an empty array to prevent to print all
  //the contries at once
  if(countryToSearch === ''){
    searchBar = [];
  }

  if(searchBar.length > 10){
    searchBar = [{ warning: 'Woops, too many matches. Be more specific'}]
  }

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setContries(response.data)
      console.log(response.data)
    })
  },[])

  const ViewControl = ({selected}) =>{
    if(selected.length === 1){
      return selectedCountry.map(country => 
        <PrintCountry 
        name={country.name} 
        capital={country.capital} 
        population={country.population} 
        flag={country.flag}
        language={country.languages}>
        </PrintCountry>
      )    
    } 
    return searchBar.map((country, index) =>    
    <PrintListOfCountries
    name={country.name} 
    key={index}
    warning={country.warning}
    getOne={handleShowClick}>
    </PrintListOfCountries>)

  }

  return ( 
  <div>  
      <p>find countries <input 
      value={newSearch}
      onChange={handleSearchBarChange}/>
      </p>
      <ViewControl selected={selectedCountry}/>
  </div>
  )
}

ReactDOM.render(
    <App/>,
  document.getElementById('root')
);
