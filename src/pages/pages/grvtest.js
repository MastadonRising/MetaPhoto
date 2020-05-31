import React, { useState, useEffect } from "react";
import PhotoCard from "../Components/PhotoCard";
import API from "../utils/API";
import EXIF from "exif-js";
import UTILS from "../utils/utils";

function App({ client }) {
  const [photoSet, setPhotoSet] = useState([]);

  useEffect(() => {
    API.getPhotoInformation().then((res) => setPhotoSet(res.data));
  }, []);

  function handleInputChange(event) {
    const files = event.target.files;
    console.log(files);

    EXIF.getData(files[0], function () {
      if (this) {
        let lat = UTILS.convertToDecimalDeg(
          this.exifdata.GPSLatitudeRef,
          this.exifdata.GPSLatitude
        );
        let lon = UTILS.convertToDecimalDeg(
          this.exifdata.GPSLongitudeRef,
          this.exifdata.GPSLongitude
        );
        console.log(`lat: ${lat}, lon: ${lon}`);
        // setCurrentGPS({ lat: lat, lon: lon });
        // setexifData({ data: this.exifdata });
      } else {
        console.log("No EXIF data found in image '" + files[0].name + "'.");
      }
    });
    // using the client passed down from App
    client
      .upload(files[0])
      .then((res) => {
        // console.log("success: ", res);

        let transformedUrl = client.transform(
          res.url,
          {
            vignette: {
              blurmode: "gaussian",
              amount: 50,
            },
            flip: true,
            blackwhite: true,
          },
          true
        );
        client.storeURL(transformedUrl).then((res) => console.log(res));
        console.log(transformedUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <>
      {/* <ImageUploadx /> */}
      <input
        type="file"
        id="file"
        multiple={false}
        accept=".jpg, .png"
        onChange={(event) => handleInputChange(event)}
        style={{ margin: "0 auto 1rem" }}
      />
      {photoSet.length < 0 ? <PhotoCard photos={photoSet} /> : <h4>Loading</h4>}
      {/* <PhotoRatings /> */}
      {/* <ImageUploadx /> */}
    </>
  );
}

export default App;
