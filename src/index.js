import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PrintCountry from './components/PrintCountry';
import PrintListOfCountries from './components/PrintListOfCountries';
import PrintWeatherOfCountry from './components/PrintWeatherOfCountry';

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {

  const [countries, setContries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [getCapitalName, setCapitalName] = useState([]);
  const [getWeather, setWeather] = useState([]);

  const handleSearchBarChange = event =>{

    setNewSearch(event.target.value);
    setSelectedCountry([]);
  }

  const handleShowClick = event =>{

    const name = event.target.parentNode.innerText.replace('Show','');
    //Single country api call
    axios
    .get(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
      setSelectedCountry(response.data);
    });

    //Weather of single country api call
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`)
    .then(response =>{
      setCapitalName(response.data.location);
      setWeather(response.data.current);
    });
  }

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setContries(response.data)
    });
  },[])

  const formatSearchInput =  () =>{
    const countryToSearch = newSearch;
    const copyOfContries = countries;
    let countryToSearchToUpper = '';
  
    //Make the first letter of the search query uppercase
    if(countryToSearch !== ''){
      countryToSearchToUpper = countryToSearch.charAt(0).toUpperCase() + countryToSearch.substring(1);
    }

    let  searchBarInput = copyOfContries.filter(el => el.name.includes(countryToSearchToUpper));
    //Set the countries array to an empty array to prevent to print all
    //the contries at once
    if(countryToSearch === ''){
      searchBarInput = [];
    }

    if(searchBarInput.length > 10){
      searchBarInput = [{ warning: 'Woops, too many matches. Be more specific'}]
    }   

  return searchBarInput
  }

  const ViewControl = ({selected}) =>{
    let searchBar = formatSearchInput();

    if(selected.length === 1){
    return(
    <div>
    {
      selectedCountry.map((country, index) =>  
      <PrintCountry 
        name={country.name} 
        capital={country.capital} 
        population={country.population} 
        flag={country.flag}
        language={country.languages}
        key={index}>
      </PrintCountry>)
    }
      <div>
    {
     <PrintWeatherOfCountry 
     name={getCapitalName.name}
     temperature={getWeather.temperature}
     icon={getWeather.weather_icons}
     description={getWeather.weather_descriptions}
     windspeed={getWeather.wind_speed}
     winddirection={getWeather.wind_dir}
     >
     </PrintWeatherOfCountry>
    }
      </div>
    </div>
    ) 
  }
 
  return searchBar.map((country, index) => 
    <PrintListOfCountries
      name={country.name} 
      key={index}
      warning={country.warning}
      getOne={handleShowClick}>
    </PrintListOfCountries>
    )
  }

  return ( 
  <div>  
      <p><strong>Find countries</strong> <input 
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
