const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

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