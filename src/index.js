import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const PrintData = ({data, index}) =>{
      return <p key={index}>{data}</p> 
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
    searchBar = [{name: 'Woops, too many matches. Be more specific'}]
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
        <PrintData data={country.name} key={index}></PrintData>
      )}
  </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


