import React, { useState, useEffect } from "react";
import "./style.css";
import ReactLoading from "react-loading";
import EXIF from "exif-js";
import UTILS from "../../utils/utils";
// import AWS from "../../utils/AWS";
import API from "../../utils/API";
import ClimbsNearYou from "../ClimbsNearYou";
import ExifTable from "../ExifTable";
import LocalClimbsContext from "../../utils/LocalClimbsContext";


function ImageUploadx() {
  const [exifData, setexifData] = useState({});
  const [routes, setRoutes] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(
    "/images/rock-climb-unsplash-wOverlay.jpg"
  );
  const [currentGPS, setCurrentGPS] = useState({ lat: 37.423, lon: -122.084 });

  // removes loader when image ready to render
  useEffect(() => {
    API.getRoutesbyLatLon(currentGPS).then((response, err) => {
      if (err) throw err;
      setRoutes(response.data.routes);
    });
    setLoading(false); // as it relates to the effect dependencies
  }, [uploadedImage, currentGPS]);

  function handlePhotoSave() {
    console.log(`clicky`);
  }

  function handleChange({
    target: {
      files: [file],
    },
  }) {
    setLoading(true); // start loadey mcloader when user inputs file
    if (file && file.name) {
      // AWS.uploadToS3andRetrieve(file).then((upload) =>
      //   setUploadedImage(upload)
      // );

      API.savePhoto({
        url: "fakeurl",
        userID: "dsf32565454sdf",
        routeID: "",
      })

      setUploadedImage("/images/rock-climb-unsplash-wOverlay-papyrus.jpg");
      EXIF.getData(file, function () {
        if (this) {
          let lat = UTILS.convertToDecimalDeg(
            this.exifdata.GPSLatitudeRef,
            this.exifdata.GPSLatitude
          );
          let lon = UTILS.convertToDecimalDeg(
            this.exifdata.GPSLongitudeRef,
            this.exifdata.GPSLongitude
          );
          setCurrentGPS({ lat: lat, lon: lon });
          setexifData({ data: this.exifdata });
        } else {
          console.log("No EXIF data found in image '" + file.name + "'.");
        }
      });
    }
  }

  return (
    <>
      <LocalClimbsContext.Provider value={{ routes }}>
        <div style={{ margin: "2rem auto", maxWidth: "576px" }}>
          <input
            type="file"
            id="file"
            multiple={true}
            accept=".jpg, .png, .heif, .heic"
            onChange={handleChange}
            style={{ margin: "0 auto 1rem" }}
          />
          <ExifTable exifdata={exifData} />
          {!loading ? (
            <img
              src={uploadedImage}
              alt="User-uploaded file"
              style={{ width: "100%" }}
            />
          ) : (
            <ReactLoading
              height="auto"
              width="auto"
              className="loader"
              type={"bars"}
              color={"black"}
            />
          )}
          <button
            onClick={() => {
              handlePhotoSave();
            }}
          >
            SAVE IMAGE TO PROFILE
          </button>
        </div>
        <ClimbsNearYou />
      </LocalClimbsContext.Provider>
    </>
  );
}

export default ImageUploadx;
