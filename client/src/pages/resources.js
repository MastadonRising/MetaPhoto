import React, { useState, useEffect } from "react";
import API from "../utils/API";

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getAllResources();
  }, []);

  function getAllResources() {
    API.getResources()
      .then((data) => setResources(data.data))
      .catch((err) => console.log(err));
  }
  // .then((res) =>
  //   JSON.stringify(res)
  // );
  // console.log("working");

  return (
    <div>
      <h4>Climbing Resources</h4>
      {resources.map((resource, index) => {
        return <span key={resource._id}>{resource.name}</span>;
      })}
    </div>
  );
}

export default Resources;
