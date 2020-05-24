import React, { useState, useEffect } from "react";
import "./style.css";
import API from "../../utils/API";

function ClimbsNearYou({ GPSlocation }) {
  const [climbRoutes, setClimbRoutes] = useState([]);

  useEffect(() => {
    API.getRoutesbyLatLon(GPSlocation).then((response) => {
      setClimbRoutes(response.data.routes);
      // console.log(response);
    });
  }, []);

  return (
    <div>
      <h4>Climbs Near You</h4>
      <ul style={{ textAlign: "left", listStyle: "none" }}>
        {climbRoutes.map((i, index) => (
          <a key={index} href={i.url}>
            <img src={i.imgSqSmall} alt={`${i.name}`}></img>
            {`${i.name}, Rating: ${i.rating}, Popularity: ${i.stars}/5`}
          </a>
        ))}
      </ul>
    </div>
  );
}

export default ClimbsNearYou;
