import React, { useState, useEffect } from "react";
// import PhotoCard from "../Components/PhotoCard";
import API from "../utils/API";
import EXIF from "exif-js";
import UTILS from "../utils/utils";
import ExifTable from "../Components/ExifTable";
import ClimbsNearYou from "../Components/ClimbsNearYou";
import PhotoRatings from "../Components/PhotoRatings";

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
  const [imgToUpload, setImgToUpload] = useState({
    url: null,
    ready: false,
    imgMedURL: "",
    imgSmURL: "",
  });
  const [routes, setRoutes] = useState({});
  const [currentGPS, setCurrentGPS] = useState({
    coords: { latitude: 37.423, longitude: -122.084 },
  });

  useEffect(() => {
    // if already processed
    if (imgToUpload.ready) {
      return;
    }
    if (
      imgToUpload.url !== null &&
      imgToUpload.uploadComplete &&
      imgToUpload.transform
    ) {
      console.log(imgToUpload);
      let transformedSMUrl = client.transform(imgToUpload.url, {
        // re
        resize: {
          width: 250,
        },
      });

      client
        .storeURL(transformedSMUrl)
        .then((res) =>
          setImgToUpload({ ...imgToUpload, imgSmURL: res.url, ready: true })
        );
    } else {
      // if no transformation is wanted
      setImgToUpload({ ...imgToUpload, ready: true });
    }
    // API.getPhotoInformation().then((res) => setPhotoSet(res.data));
  }, [imgToUpload, client]);

  useEffect(() => {
    if (!isNaN(currentGPS.coords.latitude)) {
      API.getRoutesByNavigator(currentGPS).then((response, err) => {
        if (err) throw err;
        setRoutes(response.data.routes);
      });
    }
    // console.log(currentGPS)
  }, [currentGPS]);

  function handleUpload(upload) {
    if (imgToUpload.ready) {
      let newPhotoObj = {
        url: imgToUpload.url,
        imgSmURL: imgToUpload.imgSmURL,
        imgMedURL: imgToUpload.imgMedURL,
        userID: "MP_XXXXXX",
        route: upload.route,
        routesID: upload.route.id,
        exifDATA: exifDATA,
      };

      console.log(`Photo Obj saved to DB`, newPhotoObj);

      API.savePhoto(newPhotoObj).then(() => {
        setExifDATA(null);
      });
      // reset exifData to null after loaded to db
    }
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
          setCurrentGPS({ coords: { latitude: lat, longitude: lon } });
        } else {
          console.log("No EXIF data found in image '" + file.name + "'.");
        }
      });

      // using the client passed down from App
      const onRetry = (obj) => {
        console.log(
          `Retrying ${obj.location} for ${obj.filename}. Attempt ${obj.attempt} of 10.`
        );
      };
      const onProgress = (evt) => {
        evt.totalPercent === 100
          ? setImgToUpload({ ...imgToUpload, uploadComplete: true })
          : setImgToUpload({ ...imgToUpload, uploadComplete: false });
      };

      // setImgToUpload({
      //   ...imgToUpload,
      //   url: "https://cdn.filestackcontent.com/DulGvQm4RuifSaqBCJJV",
      //   uploadComplete: true,
      // });

      // development = retrieving to avoid upload calls
      // client
      //   .retrieve("ZLSjsWWT6KmxKoFqM9AE", { metadata: true })
      //   .then((res) => {
      //     console.log("success: ", res);
      //     setImgToUpload({
      //       ...imgToUpload,
      //       url: "https://cdn.filestackcontent.com/DulGvQm4RuifSaqBCJJV",
      //       uploadComplete: true,
      //     });
      //   });

      console.log(process.env);

      client
        .upload(file, { onRetry, onProgress }, {})
        .then((res) => {
          console.log("success: ", res);
          setImgToUpload({ ...imgToUpload, url: res.url, transform: false });
        })
        .catch((err) => {
          setImgToUpload({
            ...imgToUpload,
            url: "/images/rock-climb-unsplash-icon-150x150.jpg",
            transform: false,
          });
          console.log(err);
        });
    }
  }

  // console.log(`exifData is ${exifDATA}`);

  return (
    <div style={{ clear: "both", padding: "2rem" }}>
      {/* <ImageUploadx /> */}
      <div
        className="picker-content"
        style={{ clear: "both", padding: "2rem" }}
      ></div>
      <input
        type="file"
        id="file"
        multiple={false}
        accept=".jpg, .png"
        onChange={(event) => handleInputChange(event)}
        style={{ margin: "0 auto 1rem" }}
      />
      <div style={{ clear: "both", padding: "1rem" }}>
        <a href="http://localhost:3001/api/photos"> PHOTOS API </a>
      </div>

      {exifDATA !== null ? (
        <div>
          <img
            style={{ maxWidth: "250px" }}
            src={imgToUpload.url}
            alt={exifDATA.filename}
          ></img>
          <ExifTable exifdata={{ data: exifDATA }} />
          <h2 style={{ color: "red", fontWeight: "800" }}>
            Are any of these the location of your climb?
          </h2>
          <ClimbsNearYou size={5} routes={routes} />
          <button onClick={() => handleUpload({ route: routes[0] })}>
            upload/save
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
          <h3>Climbs Near Your Location:</h3>
          <ClimbsNearYou size={1} routes={routes} />
        </div>
      )}
      {/* {photoSet.length < 0 ? <PhotoCard photos={photoSet} /> : <h4>Loading</h4>} */}
      <PhotoRatings />
      {/* <ImageUploadx /> */}

      {/* <ReactFilestack
        apikey={YOUR_API_KEY}
        componentDisplayMode={{
          type: "button",
          customText: "Click here to open picker",
          customClass: "some-custom-class",
        }}
        onSuccess={(results) => {

          API.postPhoto(results);

        }}
      /> */}
    </div>
  );
}

export default App;
