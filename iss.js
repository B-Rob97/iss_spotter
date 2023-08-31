const { error } = require('console');
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 * It should:
  pass through the error to the callback if an error occurs when requesting the IP data
  parse and extract the IP address using JSON and then pass that through to the callback (as the second argument) if there is no error
 *
 */
const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) return callback(error);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const parsedBody = JSON.parse(body);
    
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const coordinates = {
      latitude: parsedBody.latitude,
      longitude: parsedBody.longitude
    };

    callback(null, coordinates);
  });
};
  

module.exports = { fetchMyIP, fetchCoordsByIP };











// request(`${server}`, (error, response, body) => {
//   console.log('error:', error);
//   console.log('statusCode:', response && response.statusCode);
//   



// $ curl 'https://api.ipify.org?format=json'
// {"ip":"184.64.210.40"}
