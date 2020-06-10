import React, { useState, useEffect } from "react";
import API from "../utils/API";
import EXIF from "exif-js";
import UTILS from "../utils/utils";
import ReactLoading from "react-loading";
import { Container, Header, Grid } from "semantic-ui-react";
import MenuBar from '../Components/Menu'
const client = require("filestack-js").init(
  'ASqRy0SxoR0GwFXKGloCDz'
);

function Upload() {
  const list = [];
  const [status, setStatus] = useState(0);
  const [handles, setHandles] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState(null);

  // making stages per status codes, to keep track of steps
  // also serves as check for all files in a multiple-upload to be ready before moving on
  useEffect(() => {
    // first step, after extracting exifdata, locate (pun-intended) GPS coordinates in exifdata
    // find routes per photo's GPS info
    if (status === 1) {
      handles.forEach((handle) => {
        API.getPhotoByHandle(handle).then((resp) => {
          let photo = resp.data[0];

          if (photo.exifdata) {
            photo.exifdata = JSON.parse(photo.exifdata);

            if (
              photo.exifdata.GPSLongitude &&
              photo.exifdata.GPSLongitude &&
              photo.exifdata.GPSLatitude[0] !== null &&
              photo.exifdata.GPSLongitude[0] !== null
            ) {
              let lat = UTILS.convertToDecimalDeg(
                photo.exifdata.GPSLatitudeRef,
                photo.exifdata.GPSLatitude
              );
              let lon = UTILS.convertToDecimalDeg(
                photo.exifdata.GPSLongitudeRef,
                photo.exifdata.GPSLongitude
              );

              API.getRoutesByNavigator({
                coords: { latitude: lat, longitude: lon },
              }).then((resp) => {
                console.log(resp);
                // update routes field in the photo to API response routes data
                API.updatePhoto(photo._id, {
                  routes: resp.data.routes,
                }).then(() => {
                  setStatus(2);
                });
              });
            } else {
              console.log("No EXIF data found in image");
              API.updatePhoto(photo._id, {
                routes: ["No GPS Data Found."],
              }).then(() => {
                setStatus(2);
              });
            }
          }
        });
      });
    }

    // after routes have been added to a Photo's db record
    // retrieve DB photos and filter out the current photos/handles
    // set the current photos to our uploadedPhotos state for rendering
    if (status === 2) {
      API.getPhoto().then((respo) => {
        // filtering out only our current handles to use
        const photoBlock = respo.data.filter((item) =>
          handles.includes(item.handle)
        );
        setUploadedPhotos(photoBlock);

        // checking to see that routes are ready in each current photo's record
        // otherwise images may be potentially rendered to user without routes
        const routeCheck = () => {
          for (let index = 0; index < photoBlock.length; index++) {
            if (photoBlock[index].routes.length < 1) {
              return false;
            }
            return true;
          }
        };

        // once all currently uploaded photos have routes, set status 3, to get out of routecheck loop
        if (routeCheck()) {
          setStatus(3);
        }
      });
    }

    if (status === 3) {
      // be happy we got this far \^_^/
      setStatus(4);
    }
  }, [status, handles, list]);

  function extractExifData(storedImages) {
    storedImages.forEach((image) => {
      // (originalFile) is exclusive to using Filestack
      EXIF.getData(image.originalFile, function () {
        // clearing MakerNote from exifdata as it's huge and not needed right now
        if (this.exifdata.MakerNote) {
          this.exifdata.MakerNote = "";
        }
        // using handle to avoid searching for most recent uploads in photos with ID
        API.updatePhotoByHandle(image.handle, {
          exifdata: JSON.stringify(this.exifdata),
        }).then((resp) => {
          setStatus(1);   //
          console.log(resp);
          //
        });
      });
    });
  }

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
    // onCancel: () => {},
    onFileSelected: (file) => {
      // if (file.size > 1000 * 1000) {
      //   throw new Error('File too big, select something smaller than 1MB');
      // }
    },
    onFileUploadFailed: (file, err) => {
      console.log(file, err);
    },
    onFileUploadFinished: (file) => {
      // Called when each file is uploaded
      // console.log(file);
    },
    // onOpen: () => {}, //Called when the UI is mounted.
    onUploadDone: (files) => {
      // Called when all files have been uploaded.
      files.userID = "INSERT_USER_ID"; // here or in the API.postPhoto
      API.postPhoto(files); // saving files' relevant info (url, handle, etc.) to DB
      const handles = files.filesUploaded.map((each) => each.handle);
      setHandles(handles); // setting current handles to work with
      extractExifData(files.filesUploaded); // sending to EXIF extraction, needs handle and original file blob
    },
    transformations: {
      // locking aspect ratio here
      crop: {
        aspectRatio: 1,
      },
    },
    uploadInBackground: false, // can be enabled only if crop is disabled.
  });

  // all photos' data should be saved to each clickable element rendered (ie. individual route user needs to choose)
  // eliminates the photo from active set once route is selected
  function handleClimbSelect(evt) {
    let selected = JSON.parse(evt.target.dataset.photodata);
    console.log(selected);

    // checks the route clicked ("selected") and sets the routes property of our photo to the single user-selected route
    selected.routes.forEach((route) => {
      if (route.id === Number(evt.target.id)) {
        selected.routes = route;
        selected.routeID = route.id;
        API.updatePhoto(selected._id, { routes: route, routeID: route.id });
      }
    });

    // filtering out the selected/processed photo from state to remove from render
    const newuploadedPhotos = uploadedPhotos.filter(
      (item) => item.handle !== selected.handle
    );
    setUploadedPhotos([...newuploadedPhotos]);
  }

  return (
    <Container>
      <Grid columns='2' verticalAlign='middle'>
        <Grid.Column width='3' height='200px'>
          <MenuBar />
        </Grid.Column>
        <Grid.Column width='13'>
          <Header id='heading' as='h1'>Upload Photos</Header>
        </Grid.Column>
      </Grid>
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

        {status === 1 || status === 2 ? (
          <div>
            <h2>Please wait while we retrieve routes for your photos.</h2>
            <ReactLoading
              height="auto"
              width="auto"
              className="loader"
              type={"bars"}
              color={"black"}
            />
          </div>
        ) : (
            ""
          )}

        {uploadedPhotos && uploadedPhotos.length ? (
          <div>
            <h3>Select the Climb for your photos</h3>
            {uploadedPhotos.map((upload, index) => {
              return (
                <div key={index} style={{ clear: "both", display: "flex" }}>
                  <img
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                    key={index}
                    src={upload.url}
                    alt={upload.name}
                  ></img>
                  <ul>
                    {!upload.routes ? (
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
                              {route.name || route}
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

// HdPB2IAQR2mZHX09oSxp
// JWHSLG2lS2OyMrWDM48y
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
