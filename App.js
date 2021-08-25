import React, { useEffect, useState } from "react" ;
import {FormControl, Select, MenuItem, Card, CardContent,} from "@material-ui/core";
import './App.css';
import InfoBox from "./InfoBox";
import Map from "./map" ;
import TABLE  from "./table";
import {sortData, numeralStat} from "./utill" ;
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";



function App() {
const [countries, setCountries]= useState([]); 
const [country, setCountry] = useState("Worldwide");
const [countryInfo, setCountryInfo] = useState({}) ;
const [tableData, setTableDate] = useState([]);
const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
const [mapZoom, setMapZoom] = useState(3);
const [mapCountries, setMapCountries] = useState([]);
const [casesType, setCasesType] = useState(["cases"]);

useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then((response) => response.json())
  .then((data) => {
    setCountryInfo(data);
  });
}, []);

useEffect(() => {
const getCountriesData = async () => {
  await fetch("https://disease.sh/v3/covid-19/countries") 
  .then ((response) => response.json())
  .then((data) => {
  const countries = data.map((country) => ({
    name : country.country,
    value : country.countryInfo.iso2, 
  }));

  const sortedData = sortData(data);
    setTableDate(sortedData);
    setMapCountries(data);
    setCountries(countries);
  });
};
getCountriesData();
}, []);

const onCountryChange = async (event) => {
  const countryCode = event.target.value ;

  const url = countryCode === "Worldwide" 
  ? "https://disease.sh/v3/covid-19/all" : 'https://disease.sh/v3/covid-19/countries/'+countryCode 
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data)
      setCountry(countryCode);
      setMapZoom(4);
      if(countryCode==="Worldwide"){
        setMapCenter();
      }else{setMapCenter([data.countryInfo.lat, data.countryInfo.long]);}
    });
};
console.log(countryInfo)

 
  return (
    <div className="app">
    
    <div className="app__left">
   
    <div className="app__header">
    <h1>Covid-Tracker</h1>

    {/* dropDown button */}
      <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
        <MenuItem value="Worldwide">Worldwide</MenuItem>
        {
        countries.map((country) => (
        <MenuItem value={country.value }>{country.name}</MenuItem>
        ))
        }
        </Select>
       </FormControl>
      </div>
      <div className="description">
        <h3 className="description-heading">
        Description  
        </h3>
      </div>
      <div>
        <p className="description-content">
          This website is built using <a className="react" href="https://reactjs.org/">React </a>to moniter the live, recovered cases and deaths casused by corona virus around the world,the data's 
           are collected from <a className="disease" href="https://www.disease.sh/">disease.ch</a> website which is an open disease data API, the data's provided are used in different components to 
          differentiate the corona cases.There are live cards and map components shows the current worldwide cases which can dynamically change its current data to a different country's data when selected 
          which are provided through an API. 
        </p>
      </div>

      <div className="app__stats">
       <InfoBox isRed active={casesType === "cases"} onClick={(event) => setCasesType("cases")} title="Coronavirus Cases" cases={numeralStat(countryInfo.todayCases)} total={numeralStat(countryInfo.cases)}  />
       <InfoBox active={casesType === "recovered"} onClick={(event) => setCasesType("recovered")} title="Recovered" cases={numeralStat(countryInfo.todayRecovered)} total={numeralStat(countryInfo.recovered)}/>
       <InfoBox isBlue active={casesType === "deaths"} onClick={(event) => setCasesType("deaths")} title="Deaths" cases={numeralStat(countryInfo.todayDeaths)} total={numeralStat(countryInfo.deaths)}/> 
       </div>

       {/* map component */}
       <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
    </div>
    
     <Card className="app__right">
      <CardContent>

        <h3>Live cases by country</h3>

        {/* TABLE component */}
        <TABLE countries={tableData}/>
        <h3 className="worldwide"> Worldwide new {casesType} </h3>
        <LineGraph className="app__graph" casesType={casesType}/>
      </CardContent>
    
     </Card> 

    </div>
  );
}

export default App;
