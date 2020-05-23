import React from "react";
import "./style.css";
import UTILS from "../../utils/utils";

// expects an Exif data model as exported with exif-js
function ExifTable({ exifdata }) {
  const latinify = (word) =>
    word
      .split(``)
      .filter((i) => i.match(/^[ -~]+$/))
      .join(``);

  return (
    <>
      <table
        style={{
          margin: "1rem auto",
          width: "80%",
        }}
      >
        <thead>
          <tr>
            <td colSpan="2">EXIF DATA FROM IMAGE</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Taken on: </td>
            <td>{exifdata.data ? exifdata.data.DateTime : `No Date Found`}</td>
          </tr>
          <tr>
            <td>Latitude, Longitude: </td>
            <td>
              {exifdata.data
                ? `${UTILS.convertToDecimalDeg(
                    exifdata.data.GPSLatitudeRef,
                    exifdata.data.GPSLatitude
                  )}, ${UTILS.convertToDecimalDeg(
                    exifdata.data.GPSLongitudeRef,
                    exifdata.data.GPSLongitude
                  )}`
                : `No GPS Data Found`}
            </td>
          </tr>
          <tr>
            <td>Make/Model: </td>
            <td>
              {exifdata.data
                ? latinify(exifdata.data.Make) +
                  "/" +
                  latinify(exifdata.data.Model)
                : `No Make/Model Found`}
            </td>
          </tr>
          <tr>
            <td>Other</td>
            <td>
              {exifdata.data ? console.log(exifdata.data) : `Nothing Found`}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ExifTable;
