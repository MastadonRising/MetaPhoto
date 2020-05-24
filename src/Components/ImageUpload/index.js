import React, { useState, useEffect } from "react";
import "./style.css";
import EXIF from "exif-js";
import UTILS from "../../utils/utils";
import AWS from "../../utils/AWS";
import ClimbsNearYou from "../ClimbsNearYou";
import ExifTable from "../ExifTable";
import ReactLoading from "react-loading";

function ImageUploadx() {
  const [exifData, setexifData] = useState({});
  const [loadState, setLoadState] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(
    "/images/rock-climb-unsplash-wOverlay-papyrus.jpg"
  );
  const [currentGPS, setCurrentGPS] = useState({ lat: 37.423, lon: -122.084 });

  // removes loader when image ready to render
  useEffect(() => {
    setLoadState(true);
  }, [uploadedImage]);

  function handleChange({
    target: {
      files: [file],
    },
  }) {
    setLoadState(false);
    if (file && file.name) {
      AWS.uploadToS3andRetrieve(file).then((upload) =>
        setUploadedImage(upload)
      );

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
      <div style={{ margin: "2rem auto", width: "576px" }}>
        <input
          type="file"
          id="file"
          accept=".jpg, .png, .heif, .heic"
          onChange={handleChange}
          style={{ margin: "0 auto 1rem" }}
        />
        {!loadState ? (
          <ReactLoading
            height="128px"
            width="128px"
            className="loader"
            type={"bars"}
            color={"black"}
          />
        ) : (
          <img
            src={uploadedImage}
            alt="User uploaded file"
            style={{ width: "100%"}}
          />
        )}
        <button
          onClick={() => {
            return;
          }}
        >
          SAVE IMAGE TO PROFILE
        </button>
      </div>
      <ExifTable exifdata={exifData} />
      <ClimbsNearYou GPSlocation={currentGPS} />
    </>
  );
}

export default ImageUploadx;
