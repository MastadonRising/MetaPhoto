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
