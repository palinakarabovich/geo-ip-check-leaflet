import './App.css';
import React from 'react';
import Search from '../Search/Search';
import Map from '../Map/Map';
import { fetchGeo, fetchMyCurrentGeo } from '../../utils/api';
import generate from '../../utils/generateRandomIp';
import Loader from '../Loader/Loader';
import { position } from '../../types/types';
import { DEFAULT_POSITION } from '../../utils/constants';


const App: React.FC = () => {

  const [position, setPosition] = React.useState<position>(DEFAULT_POSITION);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [mapKey, setMapKey] = React.useState<number>(0);
  const [positionLoading, setPositionLoading] = React.useState<boolean>(true);

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
    setPosition(currentGeo as position);
    setMapKey(prevKey => prevKey + 1);
    setPositionLoading(false);
  }

  const getGeo = async (geo: string) => {
    setPositionLoading(true);
    const searchResult = await fetchGeo(geo) as position;
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
            <Map position={position} mapKey={mapKey} loading={positionLoading} />
          </>
      }
    </div>
  );
}

export default App;
