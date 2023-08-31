// index.js
const { error } = require('console');
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

  // fetchCoordsByIP(ip, (error, coordinates) => {
  //   if (error) {
  //     console.log("Error fetching coordinates");
  //     return;
  //   }
    
  //   console.log("Coordinates:", coordinates);
    
  // });
});