import React, { useState, useEffect } from "react";
import API from "../utils/API";
import EXIF from "exif-js";
import UTILS from "../utils/utils";
import { Container, Header } from "semantic-ui-react";

function Upload({ client }) {
  const [uploadsList, setUploadsList] = useState([]);
  const [uploadStage, setUploadStage] = useState([]);
  const [uploadToDbList, setUploadToDbList] = useState([]);
  const [uploadToDbReady, setuploadToDbReady] = useState(false);

  useEffect(() => {
    API.getPhotoInformation().then((data) => {
      // setUploadsList([...data.data.slice(4)]);
    });
  }, []);

  useEffect(() => {
    if (!uploadStage.length) {
      return;
    }
    uploadStage.forEach((file) => {
      // console.log(file);
      EXIF.getData(file.originalFile, function () {
        if (this.exifdata) {
          let lat = UTILS.convertToDecimalDeg(
            this.exifdata.GPSLatitudeRef,
            this.exifdata.GPSLatitude
          );
          let lon = UTILS.convertToDecimalDeg(
            this.exifdata.GPSLongitudeRef,
            this.exifdata.GPSLongitude
          );
          // console.log(`lat: ${lat}, lon: ${lon}`);

          // or catch error after route api call
          if (isNaN(lat)) {
            let Photo = {
              name: file.originalFile.name,
              url: file.url,
              handle: file.handle,
              userID: 7,
              routes: [],
              exifdata: this.exifdata,
            };

            return setUploadsList([...uploadsList, Photo]);
          } else {
            API.getRoutesByNavigator({
              coords: { latitude: lat, longitude: lon },
            }).then((routes) => {
              let Photo = {
                name: file.originalFile.name,
                url: file.url,
                handle: file.handle,
                userID: 7,
                routes: routes.data.routes,
                exifdata: this.exifdata,
              };
              return setUploadsList([...uploadsList, Photo]);
            });
          }
        } else {
          console.log("No EXIF data found in image");
        }
      });

      let newUploadStage = uploadStage.filter(
        (item) => item.handle !== file.handle
      );
      setUploadStage([...newUploadStage]);
    });
  }, [uploadStage, uploadsList]);

  useEffect(() => {
    if (!uploadToDbReady) {
      return;
    } else {
      return API.postPhoto(uploadStage); //
    }
  }, [uploadToDbReady, uploadStage]);

  // Filestack Picker
  const picker = client.picker({
    accept: ["image/jpeg", "image/jpg", "image/png"],
    concurrency: 4, // Max number of files to upload concurrently. Default is 4.
    // container: ".picker-content", //Container where picker should be appended. Only relevant for inline and dropPane display modes.
    // displayMode: "dropPane", // Picker display mode, one of 'inline', 'overlay', 'dropPane' - default is 'overlay'.
    exposeOriginalFile: true, // need File Obj for ExifData extraction
    // hideModalWhenUploading: true, // Hide the picker modal UI once uploading begins. Defaults to false.
    imageDim: [800, null], // [Width, Height]; Local and cropped images will be resized (upscaled or downscaled) to the specified dimensions before uploading.
    // imageMax: [800, 600], // [Width, Height]; If we want to allow smaller images to remain smaller (rather than upscale)
    maxFiles: 3, // defaults to 1
    maxSize: 1024 * 1024 * 10, // limiting to 10Mb , because we can
    // modalSize: [500,500], // [Width, Height]; optional
    onCancel: () => {
      setUploadsList([]);
    },
    onFileSelected: (file) => {
      // console.log(file);
    },
    onFileUploadFailed: (file, err) => {
      console.log(file.name, err);
    },
    onFileUploadFinished: (file) => {
      // Called
      console.log(file);
    },
    onOpen: () => console.log("opened!"), //Called when the UI is mounted.
    onUploadDone: (files) => {
      // Called when all files have been uploaded.
      console.log(files);
      return setUploadStage([...files.filesUploaded]);
    },
    uploadInBackground: false, // Start uploading immediately on file selection. can be enabled only if crop is disabled .
  });

  function handleClimbSelect(evt) {
    let selected = JSON.parse(evt.target.dataset.photodata);

    selected.routes.forEach((route) => {
      if (route.id === Number(evt.target.id)) {
        return (selected.routes = route), (selected.routeID = route.id);
      }
    });
    const newUploadsList = uploadsList.filter(
      (item) => item.handle !== selected.handle
    );
    setUploadsList([...newUploadsList]);
    setUploadToDbList([...uploadToDbList, selected]);
  }

  console.log(uploadToDbList);

  return (
    <Container>
      <Header as="h1">Upload Photos</Header>
      <p className="App-intro">
        To get started, open the picker and upload your image.
      </p>
      {/* <div className="picker-content"></div> */}
      <button
        onClick={() => {
          picker.open();
        }}
      >
        Upload
      </button>
      <div style={{ clear: "both" }}>
        {/* only loads when something has been uploaded  */}
        {uploadsList.length ? (
          <div>
            <h3>Select the Climb for your photos</h3>
            {uploadsList.map((upload, index) => {
              return (
                <div key={index} style={{ clear: "both", display: "flex" }}>
                  <img
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                    key={index}
                    src={upload.url}
                    alt={upload.name}
                  ></img>
                  <ul>
                    {!upload.routes.length ? (
                      <li>No GPS DATA Found? ¯\_(ツ)_/¯</li>
                    ) : (
                      upload.routes.map((route, index) => {
                        // console.log(upload);
                        return (
                          <li
                            key={index}
                            data-photodata={JSON.stringify(upload)}
                            id={route.id || "NO_ID"}
                            onClick={(evt) => {
                              handleClimbSelect(evt);
                            }}
                          >
                            {route.name}
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}

export default Upload;

// {"filesUploaded":[{
// "filename":"DSC_0360.JPG",
// "handle":"a3mFhZdcTZW4ndeKhPkG",
// "mimetype":"image/jpeg",
// "originalPath":"DSC_0360.JPG",
// "size":7119435,
// "source":"local_file_system",
// "url":"https://cdn.filestackcontent.com/a3mFhZdcTZW4ndeKhPkG","uploadId":"946Pb4WGOlsaaIgf",
// "originalFile":{"name":"DSC_0360.JPG","type":"image/jpeg","size":7119435},"status":"Stored"}],"filesFailed":[]}

// {"filesUploaded":[{"filename":"DSC_0362.JPG","handle":"DFMiUjY5R5ipwLWjkpQw","mimetype":"image/jpeg","originalPath":"DSC_0362.JPG","size":7194050,"source":"local_file_system","url":"https://cdn.filestackcontent.com/DFMiUjY5R5ipwLWjkpQw","uploadId":"CL5GF7I6072GHEYF","originalFile":{"name":"DSC_0362.JPG","type":"image/jpeg","size":7194050},"status":"Stored"}],"filesFailed":[]}
// {"filesUploaded":[{"filename":"DSC_0384.JPG","handle":"WaDO8a0HRomRRq1w7xLf","mimetype":"image/jpeg","originalPath":"DSC_0384.JPG","size":6095235,"source":"local_file_system","url":"https://cdn.filestackcontent.com/WaDO8a0HRomRRq1w7xLf","uploadId":"4nbicW6aF8rr8LVY","originalFile":{"name":"DSC_0384.JPG","type":"image/jpeg","size":6095235},"status":"Stored"}],"filesFailed":[]}

// {"filesUploaded":[{"filename":"DSC_0923.JPG","handle":"HxJz7X8QEqMgcBpyWPzV","mimetype":"image/jpeg","originalPath":"DSC_0923.JPG","size":5998362,"source":"local_file_system","url":"https://cdn.filestackcontent.com/HxJz7X8QEqMgcBpyWPzV","uploadId":"FDw803x3y39QTRCi","originalFile":{"name":"DSC_0923.JPG","type":"image/jpeg","size":5998362},"status":"Stored"}],"filesFailed":[]}
// {"filesUploaded":[{"filename":"DSC_0196.JPG","handle":"ONPsXNWTQhaCNmyImCnb","mimetype":"image/jpeg","originalPath":"DSC_0196.JPG","size":5612974,"source":"local_file_system","url":"https://cdn.filestackcontent.com/ONPsXNWTQhaCNmyImCnb","uploadId":"hJU30R2em8uuZiS6","originalFile":{"name":"DSC_0196.JPG","type":"image/jpeg","size":5612974},"status":"Stored"}],"filesFailed":[]}
// {"filesUploaded":[{"filename":"DSC_0390.JPG","handle":"9P0D21erRvekjq970RUe","mimetype":"image/jpeg","originalPath":"DSC_0390.JPG","size":5768800,"source":"local_file_system","url":"https://cdn.filestackcontent.com/9P0D21erRvekjq970RUe","uploadId":"8jNX85ho430YaE2X","originalFile":{"name":"DSC_0390.JPG","type":"image/jpeg","size":5768800},"status":"Stored"}],"filesFailed":[]}
