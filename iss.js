//main fetch function
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    //return an error, if any
    if (error) return callback(error, null);

    //if response is non-200 status code, assume server error
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    //return IP address as string, or null if error
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {

  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    //return error if error
    if (error) {
      callback(error, null);
      return;
    }
    
    //parse the body for us to use the information below
    const parsedBody = JSON.parse(body);

    //check if body parsing is not successful
    if (!parsedBody.success) {
      const msg = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(msg), null);
      return;
    }
    //return lat and long if successful, null if error
    const { latitude, longitude } = parsedBody;
    callback(null, { latitude, longitude });

  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};