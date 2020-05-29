import React, { useState, useEffect } from "react";
import "./style.css";
import ReactLoading from "react-loading";
import EXIF from "exif-js";
import UTILS from "../../utils/utils";
import AWS from "../../utils/AWS";
import API from "../../utils/API";
import ClimbsNearYou from "../ClimbsNearYou";
import ExifTable from "../ExifTable";
import LocalClimbsContext from "../../utils/LocalClimbsContext";

function ImageUploadx() {
  const [exifData, setexifData] = useState({});
  const [routes, setRoutes] = useState({});
<<<<<<< HEAD
  const [loadState, setLoadState] = useState(false);
=======
  const [loading, setLoading] = useState(true);
>>>>>>> Mastadon
  const [uploadedImage, setUploadedImage] = useState(
    "/images/rock-climb-unsplash-wOverlay.jpg"
  );
  const [currentGPS, setCurrentGPS] = useState({ lat: 37.423, lon: -122.084 });

  // removes loader when image ready to render
  useEffect(() => {
<<<<<<< HEAD
    setLoadState(true);
=======
>>>>>>> Mastadon
    API.getRoutesbyLatLon(currentGPS).then((response, err) => {
      if (err) throw err;
      setRoutes(response.data.routes);
    });
<<<<<<< HEAD
=======
    setLoading(false); // as it relates to the effect dependencies
>>>>>>> Mastadon
  }, [uploadedImage]);

  function handleChange({
    target: {
      files: [file],
    },
  }) {
<<<<<<< HEAD
    setLoadState(false); // stop loadey mcloader
=======
    setLoading(true); // start loadey mcloader when user inputs file
>>>>>>> Mastadon
    if (file && file.name) {
      // AWS.uploadToS3andRetrieve(file).then((upload) =>
      //   setUploadedImage(upload)
      // );

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
<<<<<<< HEAD
          {!loadState ? (
            <ReactLoading
              height="128px"
              width="128px"
              className="loader"
              type={"bars"}
              color={"black"}
            />
          ) : (
=======
          <ExifTable exifdata={exifData} />
          {!loading ? (
>>>>>>> Mastadon
            <img
              src={uploadedImage}
              alt="User uploaded file"
              style={{ width: "100%" }}
            />
<<<<<<< HEAD
=======
          ) : (
            <ReactLoading
              height="auto"
              width="auto"
              className="loader"
              type={"bars"}
              color={"black"}
            />
>>>>>>> Mastadon
          )}
          <button
            onClick={() => {
              return;
            }}
          >
            SAVE IMAGE TO PROFILE
          </button>
        </div>
<<<<<<< HEAD
        <ExifTable exifdata={exifData} />
=======

>>>>>>> Mastadon
        <ClimbsNearYou />
      </LocalClimbsContext.Provider>
    </>
  );
}

export default ImageUploadx;
