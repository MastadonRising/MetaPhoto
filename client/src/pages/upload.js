import React, { useState, useEffect } from "react";
import ImageUploadFS from "../utils/ImageUploadFileStack";
import ReactFilestack from "filestack-react";
import logo from "../logo.svg";
import API from "../utils/API";

function Upload() {
  const YOUR_API_KEY = `A3aWEEqJ0RHOqD6biKd4iz`;

  useEffect(() => {}, []);
  function storePhoto(res) {
    API.postPhoto(res);
  }
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
          ImageUploadFS(
            "https://cdn.filestackcontent.com/hDu7X9tWT0qfp0GpmpyK"
          );
        }}
      />
    </div>
  );
}

export default Upload;

// {"filesUploaded":[{"filename":"DSC_0360.JPG","handle":"a3mFhZdcTZW4ndeKhPkG","mimetype":"image/jpeg","originalPath":"DSC_0360.JPG","size":7119435,"source":"local_file_system","url":"https://cdn.filestackcontent.com/a3mFhZdcTZW4ndeKhPkG","uploadId":"946Pb4WGOlsaaIgf","originalFile":{"name":"DSC_0360.JPG","type":"image/jpeg","size":7119435},"status":"Stored"}],"filesFailed":[]}
