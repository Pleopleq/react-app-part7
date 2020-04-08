import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const PrintData = ({country, index}) =>{
  return <li key={index}>{country}</li>
}


const App = () => {

  const [countries, setContries] = useState([]);
  const [newSearch, setNewSearch ] = useState('');

  const handleSearchBarChange = event =>{
    setNewSearch(event.target.value);
  }

  const countryToSearch = newSearch;

  let copyOfContries = countries;

  const countryToSearchToUpper = countryToSearch.charAt(0).toUpperCase() + countryToSearch.substring(1);

  const searchBar = copyOfContries.filter(el => el.name.includes(countryToSearchToUpper));

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
    <ul>
      {searchBar.map((country, index ) =>
        <PrintData country={country.name} key={index}></PrintData>
      )}
    </ul>
  </div>
  )
}


ReactDOM.render(
    <App />,
  document.getElementById('root')
);


