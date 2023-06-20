import { MAIN_FETCH_URL } from "./constants"

const checkResponse = (res) => {
  if(res.ok){
    return res.json()
  } else return Promise.reject('Something is wrong')
}

export const fetchGeo = (ipFromInput) => {
  return fetch(`${MAIN_FETCH_URL}&ipAddress=${ipFromInput}`)
    .then((res) => checkResponse(res))
    .then(({ ip, location }) => {
      return{
        ip,
        coordinates: [location.lat, location.lng],
        region: location.region,
        country: location.country,
        default: false
      }})
    .catch((err) => console.error(err))
}

export const fetchMyCurrentGeo = () => {
  return fetch(MAIN_FETCH_URL)
  .then((res) => checkResponse(res))
  .then(({ ip, location }) => {
    return {
      ip,
      coordinates: [location.lat, location.lng],
      region: location.region,
      country: location.country,
      default: true
    }})
  .catch((err) => console.error(err))
}

