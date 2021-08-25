import {Circle , Popup} from "react-leaflet";
import React from "react";
import numeral from "numeral";

const casesTypeColors ={

    cases:{
        hex: "#cc1034",
        multiplier: 220,
    },
    recovered:{
        hex: "#7dd71d",
        multiplier: 200,
    },
    deaths:{
        hex: "#483D8B",
        multiplier: 1200,
    },
}

export const sortData = (data) => {
    const sortedData = [...data] ;
    // ES6
    return sortedData.sort((a,b) => (a.cases> b.cases ? -1 : 1 ));
};
export const numeralStat = (stat) => stat ? "+" + numeral(stat).format("0.0a") : "0" ;

// circles on map 
export const showDataOnMap = (data, casesType="cases") => 
data.map((country) => (
<Circle   
center={[country.countryInfo.lat, country.countryInfo.long]}
fillOpacity={0.4}
color={casesTypeColors[casesType].hex}
fillColor={casesTypeColors[casesType].hex}
radius={
Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier }>

<Popup>
<div className="info-container">
  <div className="info-flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}/>
  <div className="info-name">{country.country}</div>
  <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
  <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
  <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
</div>
</Popup>

</Circle>
));

// actual meaning for the es6 JS line:24

    // sortedData.sort((a,b)=> {
    //     if (a.cases > b.cases){
    //         return -1 ;
    //     } else {
    //         return 1 ;
    //     }
    // });
    // return sortedData ;
