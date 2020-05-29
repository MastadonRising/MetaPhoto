import React, { useState, useEffect } from "react";
import API from "../utils/API";

function SignUp() {
  const [user, setUser] = useState([]);

  useEffect(() => {}, []);

  function SignUp() {
    API.signUpUser().catch((err) => console.log(err));
  }
  return (
    <div>
      <h4>Climbing Resources</h4>
      {resources.map((resource, index) => {
        return <span key={resource._id}>{resource.name}</span>;
      })}
    </div>
  );
}

export default SignUp;
