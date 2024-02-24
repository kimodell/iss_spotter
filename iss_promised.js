const request = require('request-promise-native');

//Use promises to make a single API request to retrieve the user's IP address.
/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 */
const fetchMyIP = function() {
  //Returns: Promise of request for ip data, returned as JSON string
  return request('https://api.ipify.org?format=json');
};

//Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
const fetchCoordsByIP = function(body) { //input JSON string w/ IP address
  const ip = JSON.parse(body).ip;
  //Returns: promise of request for lat/long
  return request(`http://ipwho.is/${ip}`);
};

//Requests data from API with flyover data using provided lat/long data
//input: JSON body containing geo data response from ipwho.is
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  //define url vairable with the lat and long data pulled from the parsed body 
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function () {
 return fetchMyIP()
   .then(fetchCoordsByIP)
   .then(fetchISSFlyOverTimes)
   .then((data) => {
    const { response } = JSON.parse(data)
    return response;
   });
};

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation 
 }