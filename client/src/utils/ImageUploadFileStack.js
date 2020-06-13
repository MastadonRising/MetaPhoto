import EXIF from "exif-js";

function ImageUploadFS(x) {
  EXIF.getData(x, function () {
    var exifData = EXIF.pretty(this);
    if (exifData) {
      console.log(exifData);
      console.log(EXIF.getTag(this, "Orientation"));
    }
  });
  // } else {
  //   console.log("No EXIF data found in image '" + this.filename + "'.");
  // }
  // });
  // return <span id="file-data">{x.filename}</span>;
}

export default ImageUploadFS;
