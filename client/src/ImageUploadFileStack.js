import React from "react";
import EXIF from "exif-js";

function ImageUploadFS({ fileStack }) {
    console.log(fileStack)
  if (fileStack && fileStack.filename) {
    EXIF.getData(fileStack, function () {
      var exifData = EXIF.pretty(this);
      if (exifData) {
        console.log(exifData);
        console.log(EXIF.getTag(this, "Orientation"));
      } else {
        console.log("No EXIF data found in image '" + fileStack.filename + "'.");
      }
    });

  }
  
  return <span id="file-data">{fileStack.filename}</span>;
}

export default ImageUploadFS;
