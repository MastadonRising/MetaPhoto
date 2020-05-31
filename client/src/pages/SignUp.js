import React, { useState, useEffect } from "react";
import API from "../utils/API";

function SignUp() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [data, setData] = useState(null);

  return (
    <div className="App">
      <div>
        <h1>Register</h1>

        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />

        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />

        <button onClick={API.register(registerUsername, registerPassword)}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default SignUp;
