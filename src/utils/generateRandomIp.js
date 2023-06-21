const generateRandomIp = () => {
  let ip = '';
  for (let i = 0; i < 4; i++) {
    if (i === 0) {
      ip = generateNumber();
    } else {
      ip = ip + '.' + generateNumber();
    }
  }
  return ip;
}

const generateNumber = () => {
  return Math.floor((Math.random() * 254) + 1);
}

export default generateRandomIp;