import React from "react";
import "./style.css";
import UTILS from "../../utils/utils";

// expects an Exif data model as exported with exif-js
function ExifTable({ exifdata }) {
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
                ? UTILS.latinify(exifdata.data.Make) +
                  "/" +
                  UTILS.latinify(exifdata.data.Model)
                : `No Make/Model Found`}
            </td>
          </tr>
          <tr>
            <td>Image Resolution</td>
            <td>
              {exifdata.data
                ? UTILS.convertResolution(
                    exifdata.data.PixelXDimension,
                    exifdata.data.PixelYDimension
                  )
                : `Nothing Found`}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ExifTable;
