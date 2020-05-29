import React, { useState, useEffect } from "react";
import API from "../utils/API";

function Explore() {
  const [localClimbs, setLocalClimbs] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocalClimbs);
  }, []);

  function getLocalClimbs(data) {
    API.getRoutesbyLatLon(data).then((data) => {
      console.log(data);
      setLocalClimbs(data.data.routes);
    });
  }

  return (
    <div>
      <h4>Using geolocation JavaScript API in React</h4>
      <div>
        <h4>Climbing Resources</h4>
        {localClimbs.map((climbs, index) => {
          return <img key={climbs.name} src={climbs.imgSqSmall}></img>;
        })}
      </div>
    </div>
  );
}

export default Explore;

// localClimbs  is an array of objects
// strucutre below

// imgSqSmall are small square images the others are wonky sizes
// {
// id: 112840319
// imgMedium: "https://cdn2.apstatic.com/photos/climb/114032367_medium_1516661975.jpg"
// imgSmall: "https://cdn2.apstatic.com/photos/climb/114032367_small_1516661975.jpg"
// imgSmallMed: "https://cdn2.apstatic.com/photos/climb/114032367_smallMed_1516661975.jpg"
// imgSqSmall: "https://cdn2.apstatic.com/photos/climb/114032367_sqsmall_1516661975.jpg"
// latitude: 38.682
// location: (6) ["California", "Lake Tahoe", "Highway 50 Corridor", "Folsom", "Rainbow Boulders", "Area B"]
// longitude: -121.1759
// name: "The Easter Egg"
// pitches: ""
// rating: "V4"
// starVotes: 3
// stars: 4.7
// type: "Boulder"
// url: "https://www.mountainproject.com/route/112840319/the-easter-egg"
// }
