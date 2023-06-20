import generate from '../../utils/generateRandomIp';
import './Search.css';

const Search = ({ value, setValue, handleSearch, position, getMyCurrentGeo, getGeo }) => {

  const handleEnterPress = (event) => {
    if (event.key === 'Enter' && value) {
      handleSearch();
    }
  };

  const handleSearchButtonClick = () => {
    if (value) {
      handleSearch();
    }
  };

  const handleGetMyIPButtonClick = () => {
    getMyCurrentGeo();
  };

  const handleGetRandomIPButtonClick = () => {
    getGeo(generate())
  };

  return (
    <div className='search'>
      <input value={value} onChange={(e) => setValue(e.target.value)} className='search__input' placeholder='XXX.XXX.XXX.XXX' onKeyDown={handleEnterPress} />
      <div className='search__buttons-container'>
        <button onClick={handleSearchButtonClick} className='search__buttons-container-button' disabled={value === '' ? true : false}>search</button>
        <button onClick={handleGetRandomIPButtonClick} className='search__buttons-container-button'>get random IP-address</button>
        <button onClick={handleGetMyIPButtonClick} className='search__buttons-container-button' disabled={position.default ? true : false}>get my IP-address</button>
      </div>
      <div className='search__information'>
        <p className='search__text'>
          {position.default ? 'Your IP-address:' : 'Position for IP-address:'} {position.ip}
        </p>
        <p className='search__text'>
          Location: {position.region}, {position.country}
        </p>
      </div>
    </div>
  )
}

export default Search;