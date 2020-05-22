import React, { useState, useEffect } from "react";
import EXIF from "exif-js";
import Axios from "axios";

function ImageUploadx() {
  const [exifTags, setExifTags] = useState({});
  const [currentGPS, setCurrentGPS] = useState({ lat: 37.423, lon: -122.084 });
  const [climbRoutes, setClimbRoutes] = useState([]);

  useEffect(() => {
    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${currentGPS.lat}&lon=${currentGPS.lon}&maxDistance=30&key=200765490-6a4f3ccdce84ab9b6225f209a2b16baf`;
    console.log(exifTags);
    Axios.get(queryURI).then((response) => {
      setClimbRoutes(response.data.routes);
      // console.log(response);
    });
    console.log(climbRoutes);
  }, [currentGPS]);

  function handleChange({
    target: {
      files: [file],
    },
  }) {
    // save it to cdn here
    //
    //

    if (file && file.name) {
      EXIF.getData(file, function () {
        // var exifData = EXIF.pretty(this);
        if (this) {
          setCurrentGPS({ lat: 0, lon: 0 });
          console.log(this);
          setExifTags({ data: this.exifdata });
        } else {
          console.log("No EXIF data found in image '" + file.name + "'.");
        }
      });
    }
  }

  function convertToDecimalDeg(ref, array) {
    let result = (array[0] + array[1] / 60 + array[2] / 3600).toFixed(4);

    if (array !== undefined) {
      if (ref === (`N` || `E`)) {
        return result;
      } else {
        return -result;
      }
    }
    return `no data`;
  }

  return (
    <>
      <input
        type="file"
        id="file"
        accept=".jpg, .png, .heif, .heic"
        onChange={handleChange}
      />
      <table style={{ border: "2px solid" }}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Content</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Latitude, Longitude</td>
            <td>
              {exifTags.data
                ? `${convertToDecimalDeg(
                    exifTags.data.GPSLatitudeRef,
                    exifTags.data.GPSLatitude
                  )}, ${convertToDecimalDeg(
                    exifTags.data.GPSLongitudeRef,
                    exifTags.data.GPSLongitude
                  )}`
                : `No GPS Data Found`}
            </td>
          </tr>
          <tr>
            <td>Make/Model</td>
            <td>
              {exifTags.data
                ? exifTags.data.Make + "/" + exifTags.data.Model
                : `No Make/Model Found`}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h4>Climbs Near You</h4>
        <ul style={{ textAlign: "left", listStyle: "none" }}>
          {climbRoutes.map((i) => (
            <a href={i.url} style={{ textDecoration: "none" }}>
              <li>
                <img
                  style={{ marginRight: "2rem" }}
                  src={i.imgSqSmall}
                  alt="thumbnail of route"
                ></img>
                {`${i.name}, Rating: ${i.rating}, Popularity: ${i.stars}/5`}
              </li>
            </a>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ImageUploadx;
