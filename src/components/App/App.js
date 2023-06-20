import './App.css';
import React from 'react';
import Search from '../Search/Search';
import Map from '../Map/Map';
import { fetchGeo, fetchMyCurrentGeo } from '../../utils/api';
import generate from '../../utils/generateRandomIp';
import Loader from '../Loader/Loader';


function App() {

  const [position, setPosition] = React.useState({});
  const [inputValue, setInputValue] = React.useState('');
  const [mapKey, setMapKey] = React.useState(0);
  const [positionLoading, setPositionLoading] = React.useState(true);

  React.useEffect(() => {
    getMyCurrentGeo();
  }, [])

  const handleSearch = () => {
    getGeo(inputValue);
    setInputValue('');
  }

  const getMyCurrentGeo = async () => {
    setPositionLoading(true);
    const currentGeo = await fetchMyCurrentGeo();
    setPosition(currentGeo);
    setMapKey(prevKey => prevKey + 1);
    setPositionLoading(false);
  }

  const getGeo = async (geo) => {
    setPositionLoading(true);
    const searchResult = await fetchGeo(geo);
    if (searchResult.region === '' && searchResult.country === 'ZZ') {
      getGeo(generate())
    } else {
      setPosition(searchResult);
      setMapKey(prevKey => prevKey + 1);
      setPositionLoading(false);
    }
  }

  return (
    <div className="app">
      {
        !position.ip
          ? <Loader />
          : <>
            <Search value={inputValue} setValue={setInputValue} handleSearch={handleSearch} position={position} getMyCurrentGeo={getMyCurrentGeo} getGeo={getGeo} />
            <Map position={position} mapKey={mapKey} loading={positionLoading}/>
          </>
      }
    </div>
  );
}

export default App;
