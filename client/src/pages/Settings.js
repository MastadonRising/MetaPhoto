import React, { useState, useContext } from "react";
import API from "../utils/API";
// import UTILS from "../utils/utils";
import UserContext from "../context/userContext";
import { Container, Header, Segment, Image, Grid, Divider, Button } from "semantic-ui-react";
import MenuBar from "../Components/Menu.js"
const client = require("filestack-js").init(
  process.env.REACT_FILESTACK_KEY || "ASqRy0SxoR0GwFXKGloCDz"
);

function Settings() {
  const [newAvatar, setNewAvatar] = useState(null);
  const UserData = useContext(UserContext);

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
    onCancel: () => { },
    onFileUploadFailed: (file, err) => {
      console.log(file, err);
    },
    // onOpen: () => {}, //Called when the UI is mounted.
    onUploadDone: (files) => {
      // Called when all files have been uploaded.
      // console.log(files);
      setNewAvatar(files.filesUploaded[0].url);
      API.updateUserProfilePic(UserData.user._id, {
        profile_photo: files.filesUploaded[0].url,
      });
    },
    transformations: {
      // locking aspect ratio here
      crop: {
        aspectRatio: 1,
      },
      rotate: true,
    },
    uploadInBackground: false, // can be enabled only if crop is disabled.
  });

  return (
    <Container id='mainContainer'>
      <Header id="heading" as="h1">
        My Account Settings
      </Header>
      <MenuBar />

      {newAvatar !== null ? (
        <Container textAlign='center'>
          <h3>Confirm: </h3>
          <Image
            centered
            alt={`${"user"} profile pic`}
            src={
              newAvatar ||
              "https://cdn.filestackcontent.com/dQ3y6HCTSuXgf0chbf9e"
            }
          style={{ maxHeight: '500px'}}
          ></Image>
          <Button
            onClick={() => {
              // console.log(`clicky clicky`);
              window.location.href = "/myaccount"
            }}
            style={{ margin: "0 2rem 0 1rem" }}
          >
            Set as new profile photo?
          </Button>
        </Container>
      ) : (
          <Segment>
            <Header className="yes">Change Profile Photo:</Header>
            <Grid celled columns='2'>
              <Grid.Column widths='8'>
                <span>Current Photo:
                  <Divider />
                  <Image src={(UserData.user.profile_photo) ? UserData.user.profile_photo : null} />
                </span>
              </Grid.Column>
              <Grid.Column widths='8'>Upload New Photo:
              <Divider />
                <button
                  onClick={() => {
                    picker.open();
                  }}
                  style={{ margin: "0 0 0 1rem" }}
                >
                  Upload
          </button></Grid.Column>
            </Grid>


          </Segment>
        )}
    </Container>
  );
}

export default Settings;

// rock-climb-unsplash-icon-512x512="https://cdn.filestackcontent.com/dQ3y6HCTSuXgf0chbf9e"
