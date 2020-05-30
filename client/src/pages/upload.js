import React, { useState, useEffect } from "react";
import ImageUploadFS from "../utils/ImageUploadFileStack";
import ReactFilestack from "filestack-react";
import logo from "../logo.svg";
import API from "../utils/API";

function Upload() {
  const YOUR_API_KEY = `A3aWEEqJ0RHOqD6biKd4iz`;

  // useEffect(() => {}, []);
  // function storePhoto(res) {
  //   API.postPhoto(res);
  // }
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to MetaPhoto</h2>
      </div>
      <p className="App-intro">
        To get started, open the picker and upload your image.
      </p>

      <ReactFilestack
        apikey={YOUR_API_KEY}
        // actionOptions={PickerOptions}
        componentDisplayMode={{
          type: "button",
          customText: "Click here to open picker",
          customClass: "some-custom-class",
        }}
        onSuccess={(results) => {
          console.log(JSON.stringify(results));
          API.postPhoto(results);
          // ImageUploadFS(
          //   "https://cdn.filestackcontent.com/hDu7X9tWT0qfp0GpmpyK"
          // );
        }}
      />
    </div>
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
