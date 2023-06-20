const generateRandomIp = () => {
  let ip = '';
  for (let i = 0; i<4; i++){
    if(i === 0){
      ip = Math.floor((Math.random() * 255))
    } else {
      ip = ip + '.' + Math.floor((Math.random() * 255))
    }
  }
  return ip;
}

export default generateRandomIp;