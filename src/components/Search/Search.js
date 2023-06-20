import React from 'react';
import { VALIDATION_MESSAGE, defaultValidation, ipAdressPattern } from '../../utils/constants';
import generate from '../../utils/generateRandomIp';
import './Search.css';
import checkInput from '../../utils/inputValidation';

const Search = ({ value, setValue, handleSearch, position, getMyCurrentGeo, getGeo }) => {

  const [validation, setValidation] = React.useState(defaultValidation);

  const handleEnterPress = (event) => {
    if (event.key === 'Enter' && ipAdressPattern.test(value)) {
      hasInputError(false)
      handleSearch();
    } hasInputError(true)
  };

  const handleSearchButtonClick = () => {
    if (ipAdressPattern.test(value)) {
      hasInputError(false)
      handleSearch();
    } else hasInputError(true)
  };

  const handleGetMyIPButtonClick = () => {
    getMyCurrentGeo();
  };

  const handleGetRandomIPButtonClick = () => {
    getGeo(generate())
  };

  const handleInputChange = (e) => {
    setValue(e.target.value)
    if(e.target.value !== ''){
      if (!checkInput(e.target.value)) {
        hasInputError(true);
      } else {
        hasInputError(false)
      }
    }
  }

  const hasInputError = (error) => {
    if(error){
      setValidation({
        status: false,
        message: VALIDATION_MESSAGE
      })
    } else setValidation(defaultValidation)
  }

  return (
    <div className='search'>
      <input value={value} onChange={handleInputChange} className='search__input' placeholder='XXX.XXX.XXX.XXX' onKeyDown={handleEnterPress} />
      <p className='search__error'>{!validation.status && `${validation.message}`}</p>
      <div className='search__buttons-container'>
        <button onClick={handleSearchButtonClick} className='search__buttons-container-button' disabled={value === '' ? true : ipAdressPattern.test(value) ? false : true}>search</button>
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