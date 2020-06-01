import React, { useState, useEffect } from "react";
// import PhotoCard from "../Components/PhotoCard";
import API from "../utils/API";
import EXIF from "exif-js";
import UTILS from "../utils/utils";
import ClimbsNearYou from "../Components/ClimbsNearYou";

function App({ client }) {
  // setting up upload picker 
  // let options = {
  //   displayMode: "inline",
  //   container: ".picker-content",
  //   maxFiles: 1,
  //   accept: ["image/jpeg", "image/jpg", "image/png"],
  //   fromSources: ["local_file_system"],
  //   uploadInBackground: false,
  // };
  // var picker = client.picker(options);
  // picker.open();

  // const [photoSet, setPhotoSet] = useState([]);
  const [exifDATA, setExifDATA] = useState(null);
  const [routes, setRoutes] = useState({});
  const [currentGPS, setCurrentGPS] = useState({ lat: 37.423, lon: -122.084 });

  useEffect(() => {
    // API.getPhotoInformation().then((res) => setPhotoSet(res.data));
  }, []);

  useEffect(() => {
    API.getRoutesbyLatLon(currentGPS).then((response, err) => {
      if (err) throw err;
      setRoutes(response.data.routes);
    });
  }, [currentGPS]);

  function handleUpload(upload) {
    if (!upload.confirm) {
      return;
    }

    let newPhotoObj = {
      url: "",
      userID: "",
      route: upload.route,
      routesID: upload.route.id,
      exifDATA: exifDATA,
    };

    console.log(newPhotoObj);

    // API.savePhoto(newPhotoObj)
    // reset exifData to null after loaded to db
    // setExifDATA(null)
  }

  function handleInputChange({
    target: {
      files: [file],
    },
  }) {
    // console.log(files);
    if (file && file.name) {
      EXIF.getData(file, function () {
        setExifDATA({ ...this.exifdata });

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
        console.log(
          `Retrying ${obj.location} for ${obj.filename}. Attempt ${obj.attempt} of 10.`
        );
      };
      // using the client passed down from App
      client
        .upload(file, { onRetry, concurrency: 10 })
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

  // console.log(`exifData is ${exifDATA}`);

  return (
    <div style={{ clear: "both", padding: "2rem" }}>
      {/* <ImageUploadx /> */}
      <div className="picker-content" style={{ clear: "both", padding: "2rem" }}></div>
      <input
        type="file"
        id="file"
        multiple={false}
        accept=".jpg, .png"
        onChange={(event) => handleInputChange(event)}
        style={{ margin: "0 auto 1rem" }}
      />
      {exifDATA !== null ? (
        <div>
          <h4>Are any of these the location of your climb?</h4>
          <ClimbsNearYou size={5} routes={routes} />
          <button
            onClick={() => handleUpload({ confirm: true, route: routes[0] })}
          >
            upload
          </button>
        </div>
      ) : (
        <div
          style={{
            clear: "both",
            padding: ".5rem 1rem",
            background: "#cdcdcd",
          }}
        >
          <h1>Upload your image above to begin</h1>
          <h3>10 Climbs Near Your Location:</h3>
          <ClimbsNearYou size={10} routes={routes} />
        </div>
      )}
      {/* {photoSet.length < 0 ? <PhotoCard photos={photoSet} /> : <h4>Loading</h4>} */}
      {/* <PhotoRatings /> */}
      {/* <ImageUploadx /> */}
    </div>
  );
}

export default App;
