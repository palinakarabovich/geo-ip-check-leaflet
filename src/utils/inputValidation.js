import { ipAdressPattern, ipAdressSegmentPattern } from "./constants";

export const checkAddressSymbols = (value) => {
  const segments = value.split('.');
  if (segments.length > 4) {
    return false;
  }
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (segment.length === 0) {
      return true;
    }
    if (!ipAdressSegmentPattern.test(segment)) {
      return false;
    }
    const num = Number(segment);
    if (num < 0 || num > 255) {
      return false;
    }
  }
  return true;
};

export const checkFullAddress = (value) => {
  return ipAdressPattern.test(value);
}