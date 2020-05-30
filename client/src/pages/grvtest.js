import React, { useState, useEffect } from "react";
// import ImageUploadx from "../Components/ImageUpload";
// import PhotoRatings from "../Components/PhotoRatings";
import PhotoCard from "../Components/PhotoCard";
import API from "../utils/API";

function App() {
  const [photoSet, setPhotoSet] = useState([]);
  useEffect(() => {
    API.getPhotoInformation().then((res) => setPhotoSet(res.data));
  }, []);
  console.log(photoSet)
  return (
    <>
      {photoSet.length ? (
        
        <PhotoCard photos={photoSet} />

      ): (
        <h4>Loading</h4>
      ) }
      {/* <PhotoRatings /> */}
      {/* <ImageUploadx /> */}
    </>
  );
}

export default App;
