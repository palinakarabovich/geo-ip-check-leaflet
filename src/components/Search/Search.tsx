import React from 'react';
import { BACKGROUND_COLOR, VALIDATION_MESSAGE, DEFAULT_VALIDATION } from '../../utils/constants';
import generate from '../../utils/generateRandomIp';
import './Search.css';
import { checkAddressSymbols, checkFullAddress } from '../../utils/inputValidation';
import { searchProps } from '../../types/types';

const Search: React.FC<searchProps> = ({ value, setValue, handleSearch, position, getMyCurrentGeo, getGeo }) => {

  const [validation, setValidation] = React.useState(DEFAULT_VALIDATION);

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    if (e.key === 'Enter' && checkFullAddress(inputElement.value)) {
      handleSearch();
    }
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  const handleGetMyIPButtonClick = () => {
    getMyCurrentGeo();
  };

  const handleGetRandomIPButtonClick = () => {
    getGeo(generate());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (e.target.value !== '') {
      if (checkAddressSymbols(e.target.value)) {
        hasInputError(false)
      } else hasInputError(true)
    } else hasInputError(false)
  }

  const hasInputError = (error: boolean) => {
    if (error) {
      setValidation({
        status: false,
        message: VALIDATION_MESSAGE
      })
    } else setValidation(DEFAULT_VALIDATION)
  }

  return (
    <div className='search'>
      <h1 className='search__title'>Type any IP address to see its location</h1>
      <input value={value} onChange={handleInputChange} className='search__input' placeholder='XXX.XXX.XXX.XXX' onKeyDown={handleEnterPress} />
      <p className='search__error' style={validation.status ? { color: `${BACKGROUND_COLOR}`, userSelect: 'none' } : {}}>{validation.message}</p>
      <div className='search__buttons-container'>
        <button onClick={handleSearchButtonClick} className='search__buttons-container-button' disabled={value === '' ? true : checkFullAddress(value) ? false : true}>search</button>
        <button onClick={handleGetRandomIPButtonClick} className='search__buttons-container-button'>random IP-address</button>
        <button onClick={handleGetMyIPButtonClick} className='search__buttons-container-button' disabled={position.default ? true : false}>my IP-address</button>
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