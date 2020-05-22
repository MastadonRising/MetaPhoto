import React, { useState, useEffect } from "react";
import EXIF from "exif-js";
import API from "../../utils/API";
const AWS = require("aws-sdk");

// Enter copied or downloaded access ID and secret key here
const ID = "AKIAIBIVY7KU6WGVBTKQ";
const SECRET = "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";

// The name of the bucket that you have created
const BUCKET_NAME = "metaphotobucket";

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

function ImageUploadx() {
  const [exifTags, setExifTags] = useState({});
  const [currentGPS, setCurrentGPS] = useState({ lat: 37.423, lon: -122.084 });
  const [climbRoutes, setClimbRoutes] = useState([]);

  useEffect(() => {
    API.getRoutesbyLatLon(currentGPS).then((response) => {
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
    function uploadFile(filey) {
      // Setting up S3 upload parameters
      const params = {
        Bucket: BUCKET_NAME,
        Key: filey.name, // File name you want to save as in S3
        Body: filey,
        ContentType: `image/jpeg`,
      };

      // Uploading files to the bucket
      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
      });
    }
    //

    if (file && file.name) {
      uploadFile(file);
      EXIF.getData(file, function () {
        // var exifData = EXIF.pretty(this);
        if (this) {
          setCurrentGPS({ lat: 0, lon: 0 });
          console.log(this.exifdata);
          setExifTags({ data: this.exifdata });
        } else {
          console.log("No EXIF data found in image '" + file.name + "'.");
        }
      });
    }
  }

  function convertToDecimalDeg(ref, array) {
    if (array !== undefined) {
      let result = (array[0] + array[1] / 60 + array[2] / 3600).toFixed(4);
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
