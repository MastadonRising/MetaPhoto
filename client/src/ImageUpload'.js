import React, { useState } from "react";
import EXIF from "exif-js";

function ImageUploadx() {
  const [exifTags, setExifTags] = useState({});
  console.log(exifTags);

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
    
    if(array !==undefined){
      if (ref === (`N` || `E`)) {
        return result;
      } else {
        return -result;
      }
    }
    return `no data`
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
              {exifTags.data ? exifTags.data.Make + '/' + exifTags.data.Model : `No Make/Model Found`}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ImageUploadx;
