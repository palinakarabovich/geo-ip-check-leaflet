import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css"
import { MAPS_URL, customIcon } from "../../utils/constants";
import './Map.css';

const Map = ({position, mapKey}) => {
  return (
    <MapContainer center={position.coordinates} zoom={13} key={mapKey} >
        <TileLayer
          url={MAPS_URL}
        />
        <Marker position={position.coordinates} icon={customIcon}>
        </Marker>
      </MapContainer>
  )
}

export default Map;