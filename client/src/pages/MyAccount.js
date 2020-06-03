import React, { useState, useEffect } from "react";
import API from "../utils/API";

function Users() {
  const [UserPhotos, setUserPhotos] = useState([]);

  function getUserPhotos() {
    console.log("step 1");
    API.getPhoto().then((data) => {
      console.log(data);
      setUserPhotos(data.data);
    });
  }

  useEffect(() => {
    getUserPhotos();
  }, []);

  return (
    <div>
      <h4>Using geolocation JavaScript API in React</h4>
      <div>
        <h4>User Photos</h4>
        {UserPhotos.map((photos, index) => {
          return <img key={photos.photoID} src={photos.url}></img>;
        })}
      </div>
    </div>
  );
}

export default Users;
