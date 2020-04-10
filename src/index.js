import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const PrintData = ({name, capital, population, flag, lenguage,  index, warning}) =>{
if(warning){
  return <h1>{warning}</h1>
} else { 
  return (
  <div>
    <h1 key={index}>{name}</h1>
    <p>Capital: {capital}</p> 
    <p>Population: {population}</p>
    <img src={flag} width={240} alt={'country flag'}></img>
  </div>
  ) 
  }
}

const App = () => {

  const [countries, setContries] = useState([]);
  const [newSearch, setNewSearch] = useState('');

  const handleSearchBarChange = event =>{
    setNewSearch(event.target.value);
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
    })
  }, [])

  return ( 
  <div>  
      <p>find countries <input 
      value={newSearch}
      onChange={handleSearchBarChange}/>
      </p>
    <div>debug: {newSearch}</div>
      {searchBar.map((country, index) =>
        <PrintData 
        name={country.name} 
        capital={country.capital} 
        population={country.population} 
        flag={country.flag}
        key={index}
        warning={country.warning}>
        </PrintData>
      )}
  </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


