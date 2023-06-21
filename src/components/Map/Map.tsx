import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css"
import { MAPS_URL, CUSTOM_ICON } from "../../utils/constants";
import './Map.css';
import Loader from "../Loader/Loader";
import React from "react";
import { mapProps } from "../../types/types";

const Map: React.FC<mapProps> = ({ position, mapKey, loading }) => {

  return (
    <>
      {
        loading
          ? <div className="map__loader"><Loader /></div>
          : <MapContainer center={position.coordinates} zoom={13} key={mapKey} >
            <TileLayer
              url={MAPS_URL}
            />
            <Marker position={position.coordinates} icon={CUSTOM_ICON}>
            </Marker>
          </MapContainer>
      }
    </>
  )
}

export default Map;