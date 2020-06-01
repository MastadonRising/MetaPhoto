import React, { useState, useEffect } from "react";
import PhotoCard from "../Components/PhotoCard";
import API from "../utils/API";
import EXIF from "exif-js";
import UTILS from "../utils/utils";
import ClimbsNearYou from "../Components/ClimbsNearYou"

function App({ client }) {
  const [photoSet, setPhotoSet] = useState([]);
  const [exifDATA, setExifDATA] = useState(null);
  const [routes, setRoutes] = useState({});
  const [userConfirmation, setUserConfirmation] = useState(false)
  const [currentGPS, setCurrentGPS] = useState({ lat: 37.423, lon: -122.084 });

  useEffect(() => {
    API.getPhotoInformation().then((res) => setPhotoSet(res.data));
  }, []);

  useEffect(() => {
    API.getRoutesbyLatLon(currentGPS).then((response, err) => {
      if (err) throw err;
      setRoutes(response.data.routes);
    });
  }, [currentGPS]);

  useEffect(() => {
    if (!userConfirmation.confirm) {
      return
    }

    let newPhotoObj = {
      url: "",
      userID: "",
      routesID: userConfirmation.route,
      exifDATA: exifDATA,
    }

    console.log(newPhotoObj)

    // API.savePhoto(newPhotoObj)

  }, [exifDATA, userConfirmation]);

  function handleInputChange({
    target: {
      files: [file],
    },
  }) {
    // console.log(files);
    if (file && file.name) {
      EXIF.getData(file, function () {
        setExifDATA({ ...this.exifdata })

        if (this) {
          let lat = UTILS.convertToDecimalDeg(
            this.exifdata.GPSLatitudeRef,
            this.exifdata.GPSLatitude
          );
          let lon = UTILS.convertToDecimalDeg(
            this.exifdata.GPSLongitudeRef,
            this.exifdata.GPSLongitude
          );
          // console.log(`lat: ${lat}, lon: ${lon}`);
          setCurrentGPS({ lat: lat, lon: lon });

        } else {
          console.log("No EXIF data found in image '" + file.name + "'.");
        }
      });

      const onRetry = (obj) => {
        console.log(`Retrying ${obj.location} for ${obj.filename}. Attempt ${obj.attempt} of 10.`);
      };
      // using the client passed down from App
      client
        .upload(file, { onRetry })
        .then((res) => {

          console.log("success: ", res);

          let transformedUrl = client.transform(
            res.url,
            {
              flip: true,
            },
            true
          );


          client.storeURL(transformedUrl).then((res) => console.log(res));
        })
        .catch((err) => {
          console.log(err);
        });

    }

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
      <button onClick={() => setUserConfirmation({ confirm: true, route: { id: "", stuff: "" } })}>upload</button>
      <ClimbsNearYou routes={routes} />
      {photoSet.length < 0 ? <PhotoCard photos={photoSet} /> : <h4>Loading</h4>}
      {/* <PhotoRatings /> */}
      {/* <ImageUploadx /> */}
    </>
  );
}

export default App;
