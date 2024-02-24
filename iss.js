//main fetch function

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {


  const request = require('request');
  request('https://api.ipify.org?format=json', (error, response, body) => {
    //return an error, if any
    if (error) {
      callback(error, null);
      //return IP address as string, or null if error
    } else {
      if (body) {
        callback(null, body);
      }
    }
  });
};

module.exports = { fetchMyIP };