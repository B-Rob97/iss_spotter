const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("Error fetching coordinates");
      return;
    }
    
    console.log("Coordinates:", coordinates);

    fetchISSFlyOverTimes(coordinates, (error, flyOver) => {
    
      if (error) {
        console.log("Error fetching flyover times:", error);
        return;
      }
  
      console.log("Fly over times:", flyOver);
    
    });
  });
});

module.exports = { printPassTimes }