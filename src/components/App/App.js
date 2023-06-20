import './App.css';
import React from 'react';
import Search from '../Search/Search';
import Map from '../Map/Map';
import { fetchGeo, fetchMyCurrentGeo } from '../../utils/api';


function App() {

  const [position, setPosition] = React.useState({});
  const [inputValue, setInputValue] = React.useState('');
  const [mapKey, setMapKey] = React.useState(0);

  React.useEffect(() => {
    getMyCurrentGeo();
  }, [])

  const handleSearch = () => {
    getGeo(inputValue);
    setInputValue('')
  }

  const getMyCurrentGeo = async () => {
    const currentGeo = await fetchMyCurrentGeo();
    setPosition(currentGeo);
    setMapKey(prevKey => prevKey + 1);
  }



  const getGeo = async (geo) => {
    const searchResult = await fetchGeo(geo);
    setPosition(searchResult);
    setMapKey(prevKey => prevKey + 1);
  }

  return (
    <div className="app">
      <Search value={inputValue} setValue={setInputValue} handleSearch={handleSearch} position={position} getMyCurrentGeo={getMyCurrentGeo} getGeo={getGeo} />
      <Map position={position} mapKey={mapKey} />
    </div>
  );
}

export default App;
