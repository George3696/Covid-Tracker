
import React from "react";
import { Map as LeafletMap, TileLayer} from "react-leaflet";
import "./map.css";
import { showDataOnMap } from "./utill";

function map({countries, casesType, center, zoom}) {
  return (
    <div className="map">
    <LeafletMap className="map__leaflet" center={center} zoom={zoom}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
  {/* loop through and draw circles */}
{showDataOnMap(countries, casesType)}
</LeafletMap>

    </div>
  );
}

export default map;

