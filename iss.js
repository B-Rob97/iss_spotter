const { error } = require('console');
const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, flyOversin) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOvers);
      });
    });
  });
};

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

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    if (error) {
      callback(error);
      return;
    }

    const parsedBody = JSON.parse(body);

    if (parsedBody.message !== "success") {
      const message = `Server message says: ${parsedBody.message} when fetching for IP ${coords.latitude}`;
      callback(Error(message), null);
      return;
    }

    const flyOverTimes = parsedBody.response;
    
    callback(null, flyOverTimes);
  });
};
  
module.exports = { nextISSTimesForMyLocation, fetchMyIP, fetchISSFlyOverTimes, fetchCoordsByIP };