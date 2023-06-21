import { LatLngLiteral } from 'leaflet';

export type position = {
  ip: string;
  coordinates: LatLngLiteral;
  region?: string;
  country?: string;
  default: boolean;
}

export type mapProps = {
  position: position;
  mapKey: number;
  loading: boolean
}

export type searchProps = {
  value: string;
  setValue: (arg: string) => void;
  handleSearch: () => void;
  position: position;
  getMyCurrentGeo: () => void;
  getGeo: (arg: string) => void;
}