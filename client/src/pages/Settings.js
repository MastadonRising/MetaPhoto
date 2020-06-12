import React, { useState, useEffect } from "react";
import API from "../utils/API";
// import UTILS from "../utils/utils";
import { Container, Header } from "semantic-ui-react";
const client = require("filestack-js").init(
  process.env.REACT_APP_FILESTACK_KEY
);

function Settings() {
  const [newAvatar, setNewAvatar] = useState("null");

  // Filestack Picker
  const picker = client.picker({
    accept: ["image/jpeg", "image/jpg", "image/png"],
    concurrency: 1, // Max number of files to upload concurrently. Default is 4.
    // container: ".picker-content", //Container where picker should be appended. Only relevant for inline and dropPane display modes.
    // displayMode: "dropPane", // Picker display mode, one of 'inline', 'overlay', 'dropPane' - default is 'overlay'.
    // hideModalWhenUploading: true, // Hide the picker modal UI once uploading begins. Defaults to false.
    imageDim: [512, null], // [Width, Height]; Local and cropped images will be resized (upscaled or downscaled) to the specified dimensions before uploading.
    // imageMax: [800, 600], // [Width, Height]; If we want to allow smaller images to remain smaller (rather than upscale)
    maxFiles: 3, // defaults to 1
    maxSize: 1024 * 1024 * 10, // limiting to 10Mb , because we can
    // modalSize: [500,500], // [Width, Height]; optional
    // onCancel: () => {},
    onFileUploadFailed: (file, err) => {
      console.log(file, err);
    },
    // onOpen: () => {}, //Called when the UI is mounted.
    onUploadDone: (files) => {
      // Called when all files have been uploaded.
      console.log(files);
      // setNewAvatar(files.filesUploaded[0].url);
    },
    transformations: {
      // locking aspect ratio here
      crop: {
        aspectRatio: 1,
      },
    },
    uploadInBackground: false, // can be enabled only if crop is disabled.
  });

  return (
    <Container>
      <Header id="heading" as="h1">
        My Account Settings
      </Header>

      {newAvatar !== null ? (
        <>
          <p>Confirm: </p>
          <img
            alt={`${"user"} profile pic`}
            src={"https://cdn.filestackcontent.com/dQ3y6HCTSuXgf0chbf9e"}
            style={{ clear: "both", display: "block", maxHeight: "150px" }}
          ></img>
          <button
            onClick={() => {
              console.log(`clicky clicky`);
              // API.updateUserProfilePic("SOME_USER_ID", {
              //   profile_photo: newAvatar,
              // });
            }}
            style={{ margin: "0 2rem 0 1rem" }}
          >
            Set as new profile photo?
          </button>
        </>
      ) : (
        <>
          <span className="yes">Change profile photo:</span>
          <button
            onClick={() => {
              picker.open();
            }}
            style={{ margin: "0 0 0 1rem" }}
          >
            Upload
          </button>
        </>
      )}
    </Container>
  );
}

export default Settings;

// rock-climb-unsplash-icon-512x512="https://cdn.filestackcontent.com/dQ3y6HCTSuXgf0chbf9e"