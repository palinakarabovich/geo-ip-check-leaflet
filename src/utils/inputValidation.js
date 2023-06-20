import { symbolPattern } from "./constants";

const checkInput = (value) => {
  const lastSymbol = value[value.length - 1];
  if (!symbolPattern.test(lastSymbol)) {
    return false;
  } else return true;
}

export default checkInput;