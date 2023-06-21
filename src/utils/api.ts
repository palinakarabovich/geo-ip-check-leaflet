import { position } from "../components/types/types"
import { MAIN_FETCH_URL } from "./constants"

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json()
  } else return Promise.reject('Something is wrong')
}

export const fetchGeo = (ipFromInput: string) => {
  return fetch(`${MAIN_FETCH_URL}&ipAddress=${ipFromInput}`)
    .then((res) => checkResponse(res))
    .then(({ ip, location }) => {
      return {
        ip,
        coordinates: {lat: location.lat, lng: location.lng},
        region: location.region,
        country: location.country,
        default: false
      } as position
    })
    .catch((err) => console.error(err))
}

export const fetchMyCurrentGeo = () => {
  return fetch(MAIN_FETCH_URL)
    .then((res) => checkResponse(res))
    .then(({ ip, location }) => {
      return {
        ip,
        coordinates: {lat: location.lat, lng: location.lng},
        region: location.region,
        country: location.country,
        default: true
      } as position
    })
    .catch((err) => console.error(err))
}

